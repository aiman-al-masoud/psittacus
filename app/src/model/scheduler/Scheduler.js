import Proposition from "../Proposition.js"
import UserProgress from "./UserProgress";


/**
 * Abstract Class. 
 * 
 * Subclasses decide what `Proposition` the student should see at any point of a `Lesson`. 
 * 
 * Subclasses must implement:
 * 
 * -> `next()`
 * 
 * To decide what `Proposition` to point to next, and to set the `isLessonOver` flag.
 * 
 */
export default class Scheduler {

    constructor(lessonJson) {
        this.propositions = lessonJson.propositions.map(p => { return new Proposition(p) })
        this.lessonId = lessonJson.metadata.author + lessonJson.metadata.target_language + lessonJson.metadata.source_language + lessonJson.metadata.title //TODO: fix
        this.isLessonOver = false
    }

    /**
     * Deceides whether or not to proceed to the next Proposition.
     * @returns {void}
     */
    next() {
        throw new Error("next() not implemented!")
    }

    /**
     * Did the student do enough exercise on these Propositions?
     * @returns {boolean}
     */
    isOver() {
        this.isLessonOver? UserProgress.saveLessonScore(this.lessonId, this.dumpScores()) : ""
        return this.isLessonOver
    }

    /**
     * Return the overall score of the student on these Propositions.
     * @returns {number}
     */
    overallScore() {
        return parseInt(this.propositions.map((p) => { return p.getScore() }).reduce((a, b) => { return a + b }) / this.propositions.length)
    }

    /**
     * Return the currently displayed Proposition.
     * @return {Proposition}
     */
    getCurrent() {
        return this.current
    }

    /**
     * Dumps info relative to the user's performance with this object's Propositions.
     * 
     * ```json
     * {
     * "last_taken" : unix epoch timestamp,
     * "overall" : overall score,
     * "propositions" : [ [propoHash1, score1], [propoHash2, score2]  ]
     * }
     * ```
     * 
     * @returns 
     */
    dumpScores() {

        return {
            "last_taken": new Date().getTime(),
            "overall": this.overallScore(),
            "propositions": this.propositions.map((p) => { return [p.getHash(), p.getScore()] })
        }

    }


}

