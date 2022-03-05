import { PropositionBuilder } from "./proposition_builder.js"
import { saveToComp } from "./utils.js"

export default class LessonBuilder {

    constructor() {
        this.propositions = [new PropositionBuilder()]
        this.current = 0
        this.metadata = {author:"", source_language:"", target_language:""},
        this.explanationText = ""
    }

    /**
     * Alt 'constructor' that takes in a json in the format produced by 'toJson'.
     */
    static fromExistingJson(jsonData) {
        let lb = new LessonBuilder()
        lb.propositions = jsonData.propositions.map((p) => { return PropositionBuilder.fromExistingJson(p) })
      
        
        lb.metadata = jsonData.metadata??{}
        lb.explanationText = jsonData.explanation.text

        return lb
    }


    getCurrent() {
        return this.propositions[this.current]
    }

    next() {

        //no new proposition if current one is incomplete
        if (!(this.propositions[this.current].sentenceOne && this.propositions[this.current].sentenceTwo)) {
            return
        }

        this.current++
        this.propositions[this.current] = this.propositions[this.current] ?? new PropositionBuilder()
    }


    prev() {
        this.current = this.propositions[this.current - 1] == undefined ? this.current : this.current - 1
    }

    toJson() {
        return {
            metadata  : {...this.metadata, last_modified: new Date().getTime()},
            propositions: this.propositions.filter((p) => !p.isEmpty()).map((p) => p.toJson()),
            explanation : {text : this.explanationText}
        }
    }


    save = ()=>{
        saveToComp(JSON.stringify(this.toJson()), "lesson.txt", "text/plain")
    }


    setExplanationText = (explanationText)=>{
        this.explanationText = explanationText
    }




}

