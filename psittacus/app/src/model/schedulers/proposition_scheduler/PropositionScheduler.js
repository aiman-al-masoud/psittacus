import Proposition from "../../proposition/Proposition"

/**
 * # Abstract Class
 * 
 * Subclasses decide what `Proposition` the student should see at any point of a `Lesson`. 
 * 
 * **Place subclasses in the `./classes` directory and export them as default, for automatic inclusion in build path.**
 * 
 * # Subclasses implement:
 * 
 * * `isOver()` : to decide whether the student did enough work :-). 
 * 
 * * `initSequence()` : to initially sort the `this.propositions` array.
 * 
 * * `next()` : to point to the next proposition, setting `this.current`
 * 
 * * `getType()` : to provide an identifier for the subclass.
 * 
 * * `getDescription()` : to provide a description for the final user.  
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
     * Re-shuffles the `propositions` array.
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
        throw new Error("PropositionScheduler is abstract!")
    }

    static getDescription(){
        throw new Error("PropositionScheduler is abstract!")
    }

    static getTemplate(){
        return "class MyPropoScheduler{\n\nconstructor(oldScores, propositions){\n\n}\n\nnext(){\n\n}\n\nisOver(){\n\n}\n\nstatic getType(){\n\n}\n\nstatic getDescription(){\n\n}  \n\n}"
    }

   
}

