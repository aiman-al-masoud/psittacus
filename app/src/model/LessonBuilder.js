import  PropositionBuilder  from "./PropositionBuilder.js"
import { saveToComp } from "./Utils.js"
const packageJson = require.context("../../..", false, /package.json$/).keys().map(require.context("../../..", false, /package.json$/))[0]

/**
 * Builds, edits and saves lessons.
 */
export default class LessonBuilder {

    constructor() {
        this.propositions = [new PropositionBuilder()]
        this.current = 0
        this.metadata = { author: "", source_language: "", target_language: "", title : "" }
        this.explanationHtmlString = ""
    }

    /**
     * Alt 'constructor' that takes in a json in the format produced by 'toJson'.
     */
    static fromExistingJson(jsonData) {
        let lb = new LessonBuilder()
        lb.propositions = jsonData.propositions.map((p) => { return PropositionBuilder.fromExistingJson(p) })
        lb.metadata = jsonData.metadata ?? {}
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
     * @returns PropositionBuilder
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
     */
    save = () => {
        saveToComp(JSON.stringify(this.toJson()), "lesson.txt", "text/plain")
    }


}
