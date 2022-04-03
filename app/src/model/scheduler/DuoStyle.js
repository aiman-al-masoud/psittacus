import Scheduler from "./Scheduler";
import Proposition from "../Proposition.js"

/**
 * A simple memory-less Scheduler that plays the Propositions in the
 * order defined by the Lesson's author.
 * 
 * When the student is done with new Propositions, 
 * this Scheduler (eventually) starts displaying the ones that the student 
 * got wrong, and doesn't terminate the Lesson until the student gets them all right.
 */
export default class DuoStyle extends Scheduler{

    constructor(lessonJson){
        super(lessonJson)
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

}