import { BasePropositionScheduler } from "../PropositionScheduler"
import { MIN_PASSING_SCORE } from "../../../proposition/Proposition"
import { Context } from "../../../Context"

/**
 * A memory-less `PropositionScheduler` that plays the `Proposition`s in the
 * order defined by the `Lesson`'s author.
 * 
 * When the student is done with new `Proposition`s, 
 * this scheduler (eventually) starts displaying the ones that the student 
 * got wrong, and doesn't let him/her go until he/she gets them all right.
 */
export default class UntilAllCorrect extends BasePropositionScheduler {

    readonly screwedUpPropositions = this.propositions.filter((p) => { return p.getScore() < MIN_PASSING_SCORE }) //list of 'questions' user failed at

    initSequence(): void {

    }

    next() {
        super.next()
        this.current = this.current ?? this.screwedUpPropositions[0]
    }

    isOver() { //lesson over, if current Proposition undefined, and no screwed up proposition
        return (!this.current) &&
            (this.propositions.filter((p) => { return p.getScore() < MIN_PASSING_SCORE }).length <= 0)
    }

    getType() {
        return 'UntilAllCorrect'
    }

    static getType() {
        return 'UntilAllCorrect'
    }

    getDescription(context?: Context) {
        return context?.L.until_all_correct_PS ?? ''
    }

    static getDescription(context?: Context) {
        return context?.L.until_all_correct_PS ?? ''
    }

}