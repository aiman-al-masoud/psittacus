import PropositionScheduler from "../PropositionScheduler"
import Proposition from "../../proposition/Proposition"

/**
 * A memory-less Scheduler that plays the Propositions in the
 * order defined by the Lesson's author.
 * 
 * When the student is done with new Propositions, 
 * this Scheduler (eventually) starts displaying the ones that the student 
 * got wrong, and doesn't terminate the Lesson until the student gets them all right.
 */
export default class DuoStyle extends PropositionScheduler{

    constructor(oldScores, propositions){
        super(oldScores, propositions)
        this.iterator = this.propositions.values()
        this.next()
    }
  
    next(){

        this.current = this.iterator.next().value

        //list of 'questions' user failed at
        this.screwedUpPropositions = this.propositions.filter((p) => { return p.getScore() < Proposition.MIN_PASSING_SCORE })

        //lesson not over yet, if at least one fail
        if (this.screwedUpPropositions.length > 0) {
            this.current =  this.current ?? this.screwedUpPropositions[0]
            return
        }

        //lesson over, if current Proposition undefined, and no screwed up propositions.
        if (!this.current) {
            this.isLessonOver = true
            this.current = Proposition.NULL
        }

    }

    static getType(){
        return "Duo Style"
    }


}