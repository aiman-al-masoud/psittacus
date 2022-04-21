import Proposition from "../proposition/Proposition"

/**
 * **Abstract Class**. 
 * 
 * Subclasses decide what `Proposition` the student should see at any point of a `Lesson`. 
 * 
 * **Place subclasses in the `./classes` directory and export them as default, for automatic inclusion in build path.**
 * 
 * ## Subclasses must implement:
 * 
 * * `next()`: to decide what `Proposition` to point to next, and to set the `isLessonOver` flag.
 * 
 * ## Subclasses can override:
 * 
 * * `initSequence()`: to sort the `propositions` array in a different order than the one specified in the Lesson's json by the author of the Lesson.
 * 
 */
export default class PropositionScheduler {

    /**
     * Takes the list of propostions and the oldScores of a Lesson.
     * @param {*} oldScores
     * @param {[Proposition]} propositions 
     */
    constructor(oldScores, propositions) {
        this.oldScores = oldScores
        this.propositions  = propositions
        this.initSequence()
        this.counter = 0
        this.current = this.propositions[this.counter]
    }

    /**
     * Initialize the `propositions` array.
     * 
     * Subclasses that override this should call `super.initSequence()`
     * first, to initialize the `propositions` array. Then they can sort it.
     * 
     */
    initSequence(){

    }

    /**
     * Decides whether or not to proceed to the next Proposition.
     * @returns {void}
     */
    next() {
        this.counter++
        this.current = this.propositions[this.counter]
    }

    /**
     * Did the student do enough exercise on these Propositions?
     * @returns {boolean}
     */
    isOver() {

    }

    /**
     * Return the currently displayed Proposition.
     * @return {Proposition}
     */
    getCurrent() {
        return this.current ?? Proposition.NULL
    }

    static getType(){
        throw new Error("PropositionScheduler: is an abstract class!")
    }

   
}

