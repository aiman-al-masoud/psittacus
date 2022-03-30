import Proposition from "../Proposition.js"

/**
 * Abstract Class. 
 * 
 * Subclasses deceide what Proposition the student should see at any point of a Lesson. 
 * 
 * Subclasses must implement:
 * 
 * -> next()
 * 
 * They may override:
 * 
 * -> isOver()
 * 
 * But only in order to save the progress of a user in a specific Lesson, and they must return super.isOver().
 * 
 */
export default class Scheduler{

    constructor(lessonJson){
        this.propositions = lessonJson.propositions.map(p => { return new Proposition(p) })
        this.lessonId = lessonJson.metadata.author+lessonJson.metadata.target_language+lessonJson.metadata.source_language+lessonJson.metadata.title //TODO: fix
        this.isLessonOver = false
    }

    /**
     * Deceides whether or not to proceed to the next Proposition.
     * @returns {void}
     */
    next(){
        throw new Error("next() not implemented!")
    }

    /**
     * Did the student do enough exercise on these Propositions?
     * @returns {boolean}
     */
    isOver(){
        return this.isLessonOver
    }

    /**
     * Return the overall score of the student on these Propositions.
     * @returns {number}
     */
    getScore(){
        return parseInt(this.propositions.map((p) => { return p.getScore() }).reduce((a, b) => { return a + b }) / this.propositions.length)
    }

    /**
     * Return the currently displayed Proposition.
     * @return {Proposition}
     */
    getCurrent() {
        return this.current 
    }

}

