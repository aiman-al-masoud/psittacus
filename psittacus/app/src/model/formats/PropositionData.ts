export type WordDict = { [word: string]: string }

export interface PropositionData {

    /**
     * the sentence in the **target language** (ie: the language the student wishes to learn).
     */
    sentence_one: string

    /**
     * the same idea expressed in the **student's language**.
     */
    sentence_two: string

    /**
     * A dictionary that provides a brief description of each word of the target lang.
     * 
     * A 'word' here simply means: 'a string of unicode characters surrounded by
     * spaces'.
     * 
     * The description can and should be made up of more words, and may eventually include a brief analysis of the grammar (tense, gender, case markings...) if
     * that helps the student understand the context better. In more 'advanced'
     * lessons, this brief definition may be provided in terms of the target
     * language, for those who favor a full-immersion approach.
     */
    word_dict: WordDict

    /**
     * a dictionary that provides a brief description of each word of the source lang in terms of the target lang.
     */
    reverse_dict: WordDict

    /**
     * the audio of sentence_one (in the **target language**) recorded by a native or proficient speaker. Encoded as audio-data in base-64.
     */
    audio_base64: string

    /**
     * true if the user should be asked to translate from the target language to his/her native one, false otherwise.
     */
    target_to_native: boolean

    /**
     * Option to show select-a-word buttons instead of a text area for the answer.
     */
    word_buttons: boolean

    /**
     * Extra words to confuse the student when using word_buttons=true
     */
    extra_words: string
}
