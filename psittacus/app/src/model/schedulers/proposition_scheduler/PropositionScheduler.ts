import { Context } from "../../Context"
import { Proposition } from "../../proposition/Proposition"
import { LessonProgressData } from "../../UserProgress"
import { nullProposition } from "../../proposition/Proposition"

/**
 * Decides what `Proposition` the student should see at any point of a `Lesson`.
 */
export interface PropositionScheduler {
    /* to initially sort the propositions array */initSequence(): void
    /* to point to the next proposition */next(): void
    /* to decide whether the student has done enough work :-) */isOver(): boolean
    /* to provide an identifier for the subclass */getType(): string
    /* to provide a description for the final user */getDescription(context?: Context): string
    getCurrent(): Proposition
}

export abstract class BasePropositionScheduler implements PropositionScheduler {

    constructor(
        readonly context: Context,
        readonly oldScores: LessonProgressData,
        readonly propositions: Proposition[],
        protected counter = 0,
        protected current: Proposition | undefined = undefined
    ) {
        this.initSequence()
        this.counter = 0
        this.current = this.propositions[this.counter]
    }

    abstract initSequence(): void
    abstract isOver(): boolean
    abstract getType(): string
    abstract getDescription(): string

    next(): void {
        this.current = this.propositions[++this.counter]
    }

    getCurrent() {
        return this.current ?? nullProposition
    }

}