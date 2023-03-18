
//@ts-ignore
import { Recorder, playBase64 } from "../utilities/Recorder.js"

type WordDict = { [word: string]: string }

export interface PropositionData {
    sentence_one: string
    sentence_two: string
    word_dict: WordDict
    reverse_dict: WordDict
    audio_base64: string
    target_to_native: boolean
    word_buttons: boolean
    extra_words: string
}

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

/**
 * Builds and edits Propositions.
 */
class BasePropositionBuilder implements PropositionBuilder {

    protected recorder = new Recorder()

    constructor(
        public data: Partial<PropositionData>,
        public word_dict = data.word_dict ?? {},
        public reverse_dict = data.reverse_dict ?? {},
        public target_to_native = data.target_to_native ?? true,
        public sentence_one = data.sentence_one ?? '',
        public sentence_two = data.sentence_two ?? '',
        public word_buttons = data.word_buttons ?? false,
        public extra_words = data.extra_words ?? '',
        public audio_base64 = data.audio_base64 ?? ''
    ) {

    }

    toJson() {
        return {
            sentence_one: this.sentence_one,
            sentence_two: this.sentence_two,
            word_dict: this.word_dict,
            reverse_dict: this.reverse_dict,
            audio_base64: this.audioBase64,
            target_to_native: this.target_to_native,
            word_buttons: this.word_buttons,
            extra_words: this.extra_words,
        }
    }

    /**
     * Sentence in the Target Language.
     * Taget Language: the language this lesson is trying to teach.
     */
    setSentenceOne(sentence_one: string) {
        this.sentence_one = sentence_one
        return this
    }

    /**
     * Sentence in the Source Language.
     * Source Language: the language that the student already knows.
     */
    setSentenceTwo(sentence_two: string) {
        this.sentence_two = sentence_two
        return this
    }

    /**
     * Record audio in target language.
     */
    record() {
        this.recorder.record()
        return this
    }

    /**
     * Stop recording audio.
     */
    stopRecording() {
        this.recorder.stop()
        return this
    }

    /**
     * Is the proposition being built still empty?
     */
    isEmpty() {
        return !(this.sentence_one && this.sentence_two)
    }

    /**
     * Do a sound test after recording yourself.
     */
    playAudio = () => {
        playBase64(this.audioBase64)
    }

    /**
     * By default, user is asked to translate target to native, 
     * this method inverts the order.
     */
    invertTranslationDirection() {
        this.target_to_native = !this.target_to_native;
        return this
    }

    setWordDict(word_dict: WordDict): PropositionBuilder {
        this.word_dict = word_dict
        return this
    }

    setReverseDict(reverse_dict: WordDict): PropositionBuilder {
        this.reverse_dict = reverse_dict
        return this
    }

    invertWordButtons(): PropositionBuilder {
        this.word_buttons = !this.word_buttons
        return this
    }

    setExtraWords(extra_words: string): PropositionBuilder {
        this.extra_words = extra_words
        return this
    }

    get wordButtons() {
        return this.word_buttons
    }

    get wordDict() {
        return this.word_dict
    }

    get reverseDict() {
        return this.reverse_dict
    }

    get sentenceOne() {
        return this.sentence_one
    }

    get sentenceTwo() {
        return this.sentence_two
    }

    get audioBase64() {
        return this.recorder.base64 ?? this.audio_base64
    }

    get targetToNative() {
        return this.target_to_native
    }

    get extraWords() {
        return this.extra_words
    }

}

