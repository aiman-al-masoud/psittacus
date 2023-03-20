import { Proposition } from '../proposition/Proposition'
import { LessonData } from "../formats/LessonData"
import { LessonProgressData } from '../UserProgress'
import { Context } from '../Context'
import { BaseLesson } from './classes/BaseLesson'

/**
 * A lesson mainly contains a list of Propositions.
 */
export interface Lesson {
    next(): void
    getCurrent(): Proposition
    isOver(): boolean
    getScore(): number
    getId(): string
    dumpScores(): LessonProgressData
    cacheLesson(): Promise<void>
    saveScore(): void
    getExplaination(): string
    getPropositions(): Proposition[]
}

export function getLesson(data: LessonData, context: Context): Lesson {
    return new BaseLesson(data, context)
}