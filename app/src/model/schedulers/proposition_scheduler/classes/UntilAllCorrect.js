import PropositionScheduler from "../PropositionScheduler"
import Proposition from "../../../proposition/Proposition"
import L from "../../../utilities/Language"
/**
 * A memory-less `PropositionScheduler` that plays the `Proposition`s in the
 * order defined by the `Lesson`'s author.
 * 
 * When the student is done with new `Proposition`s, 
 * this scheduler (eventually) starts displaying the ones that the student 
 * got wrong, and doesn't let him/her go until he/she gets them all right.
 */
export default class UntilAllCorrect extends PropositionScheduler{
  
    next(){
        super.next()
        //list of 'questions' user failed at
        this.screwedUpPropositions = this.propositions.filter((p) => { return p.getScore() < Proposition.MIN_PASSING_SCORE })
        this.current =  this.current ?? this.screwedUpPropositions[0]
    }

    isOver(){
        //lesson over, if current Proposition undefined, and no screwed up propositions.
        return (!this.current) && 
        ( this.propositions.filter((p) => { return p.getScore() < Proposition.MIN_PASSING_SCORE }).length <= 0)
    }

    static getType(){
        return "Until All Correct"
    }

    static getDescription(){
        return L.until_all_correct_PS
    }



}