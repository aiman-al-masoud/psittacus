import { PropositionData, WordDict } from "../../formats/PropositionData"
import { BasePropositionBuilder } from "./BasePropositionBuilder"

export interface PropositionBuilder {
    toJson(): PropositionData
    setSentenceOne(sentence_one: string): PropositionBuilder
    setSentenceTwo(sentence_two: string): PropositionBuilder
    invertTranslationDirection(): PropositionBuilder //toggle
    invertWordButtons(): PropositionBuilder //toggle
    setWordDict(word_dict: WordDict): PropositionBuilder
    setReverseDict(reverse_dict: WordDict): PropositionBuilder
    setExtraWords(extra_words: string): PropositionBuilder
    record(): void
    stopRecording(): void
    isEmpty(): boolean
    playAudio(): void

    readonly wordDict: WordDict
    readonly reverseDict: WordDict
    readonly sentenceOne: string
    readonly sentenceTwo: string
    readonly audioBase64: string
    readonly targetToNative: boolean
    readonly wordButtons: boolean
    readonly extraWords: string

}

export function getPropositionBuilder(data: Partial<PropositionData>): PropositionBuilder {
    return new BasePropositionBuilder(data)
}