import { BasePropositionScheduler } from "../PropositionScheduler"
import { Context } from "../../../Context"


/**
 * A `Scheduler` with memory, that plays `Propositions`
 * sorted ascendingly by the score the user got on each, last time they took the same `Lesson`.
 * 
 * Letting the user see the ones they need to revise the most first, thus leveraging the Primacy Effect.
 * 
 * https://en.wikipedia.org/wiki/Serial-position_effect
 */
export default class WorstFirst extends BasePropositionScheduler {

    /**
     * Load back past scores and decide a repeptition strategy (sequence of Propositions)
     */
    initSequence() {

        try {
            const propoScores = this.oldScores.propositions
            propoScores.sort((p1, p2) => p1[1] - p2[1]) //sort by score (index=1) // in-place        
            const hashes = propoScores.map(p => p[0]) //get hashes (index=0)
            this.propositions.sort((p1, p2) => hashes.indexOf(p1.getHash()) - hashes.indexOf(p2.getHash())) // in-place
        } catch {
            console.log(`${this.constructor.name}: failed to sort propositions by old scores. Normal if it's the first time user takes lesson w/ this id.`)
        }
    }

    isOver() {
        return !this.current //current is nullish
    }

    getType() {
        return 'WorstFirst'
    }

    static getType() {
        return 'WorstFirst'
    }

    getDescription(context?: Context) {
        return context?.L.worst_first_PS ?? ''
    }

    static getDescription(context?: Context) {
        return context?.L.worst_first_PS ?? ''
    }

}