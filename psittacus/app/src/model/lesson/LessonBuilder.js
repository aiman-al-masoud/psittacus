import PropositionBuilder from "../proposition/PropositionBuilder.js"
import { saveToComp } from "../utilities/Utils.js"
const packageJson = require.context("../../../..", false, /package.json$/).keys().map(require.context("../../../..", false, /package.json$/))[0]

/**
 * Builds, edits and saves lessons.
 */
export default class LessonBuilder {

    static MetadataIncompleteError = "MetadataIncompleteError"
    static MetadataTemplate =  { author: "", source_language: "", target_language: "", title : "" }

    constructor() {
        this.propositions = [new PropositionBuilder()]
        this.current = 0
        this.metadata = LessonBuilder.MetadataTemplate
        this.explanationHtmlString = ""
    }

    /**
     * Alt 'constructor' that takes in a json in the format produced by 'toJson'.
     */
    static fromExistingJson(jsonData) {
        let lb = new LessonBuilder()
        lb.propositions = jsonData.propositions.map((p) => { return PropositionBuilder.fromExistingJson(p) })
        lb.metadata = { ...LessonBuilder.MetadataTemplate, ...jsonData.metadata} 
        lb.explanationHtmlString = jsonData.explanation.text
        return lb
    }

    toJson() {
        return {
            metadata: { ...this.metadata, last_modified: new Date().getTime(), psittacus_version : packageJson.version },
            propositions: this.propositions.filter((p) => !p.isEmpty()).map((p) => p.toJson()),
            explanation: { text: this.explanationHtmlString }
        }
    }

    /**
     * Get the proposition currenlty under audit.
     * @returns {PropositionBuilder}
     */
    getCurrent() {
        return this.propositions[this.current]
    }

    /**
     * Point to the next proposition, either existing or new.
     */
    next() {

        //no new proposition, if current one is incomplete
        if (!(this.propositions[this.current].sentenceOne && this.propositions[this.current].sentenceTwo)) {
            return
        }

        this.current++
        this.propositions[this.current] = this.propositions[this.current] ?? new PropositionBuilder()
    }

    /**
      * Point to the previous proposition.
      */
    prev() {
        this.current = this.propositions[this.current - 1] == undefined ? this.current : this.current - 1
    }

    /**
     * Set the explanation's html string of the lesson.
     * @param {string} explanationHtmlString 
     */
    setExplanation = (explanationHtmlString) => {
        this.explanationHtmlString = explanationHtmlString
    }

   
    /**
     * Prompt the user to save their work as a lesson json text file.
     * @throws {LessonBuilder.MetadataIncompleteError}
     */
    save = () => {

        //every metadata value MUST BE NON-FALSY!
        if(!Object.values(this.metadata).every((val)=> { return !!val }  )){
            throw LessonBuilder.MetadataIncompleteError
        }
        
        saveToComp(JSON.stringify(this.toJson()), `${this.metadata.title}.txt`, "text/plain")
    }

    /**
     * Amount of p propositions the resulting Lesson will contain.
     * (May actually be p-1 if last proposition is empty).
     * @returns {number}
     */
    size = ()=>{
        return this.propositions.length
    }

    /**
     * Index (starting from 1) of the current proposition being edited.
     * @returns {number}
     */
    currentIndex = ()=>{
        return this.current + 1
    }



}

