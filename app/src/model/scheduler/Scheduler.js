import Proposition from "../Proposition.js"


/**
 * Abstract Class.
 * Decides what Proposition the student should see at any point.
 * Decides if the lesson is over or not
 */
export default class Scheduler{

    constructor(lessonJson){
        this.propositions = lessonJson.propositions.map(p => { return new Proposition(p) })
        this.lessonId = lessonJson.metadata.author+lessonJson.metadata.target_language+lessonJson.metadata.source_language+lessonJson.metadata.title //TODO: fix
        this.isLessonOver = false
    }

    next(){
        throw new Error("next() not implemented!")
    }

    getCurrent(){
        throw new Error("getCurrent() not implemented!")
    }

    isOver(){
        return this.isLessonOver
    }

    getScore(){
        return parseInt(this.propositions.map((p) => { return p.getScore() }).reduce((a, b) => { return a + b }) / this.propositions.length)
    }

    getCurrent() {
        return this.current 
    }

}

