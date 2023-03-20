import { Context } from "../Context"
import { BaseProposition, NullProposition } from "./classes/BaseProposition"
import { WordDict } from "../formats/PropositionData"
import { PropositionData } from "../formats/PropositionData"

export interface Proposition {
    play(): void
    check(userTranslation: string): number
    getScore(): number
    sentenceOneEntries(): string[][] //[string, string][]
    sentenceTwoEntries(): string[][]//[string, string][]
    getQuestionWordDict(): string[][] //[string, string][]
    getAnswerWordDict(): string[][]//[string, string][]
    getHash(): number
    readonly targetToNative: boolean
    readonly wordButtons: boolean
    readonly wordDict: WordDict
    readonly reverseDict: WordDict
    readonly extraWords: string
}

export function getProposition(data: PropositionData, c: Context): Proposition {
    return new BaseProposition(data, c);
}

/**
* Min accuracy for user translation to be considered successful.
*/
export const MIN_PASSING_SCORE = 51

/**
* Used as a placeholder to make sure nothing breaks when you run out of real ones.
*/
export const nullProposition: Proposition = new NullProposition();
