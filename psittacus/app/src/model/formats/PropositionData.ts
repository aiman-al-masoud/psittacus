export type WordDict = { [word: string]: string }

export interface PropositionData {
    sentence_one: string;
    sentence_two: string;
    word_dict: WordDict;
    reverse_dict: WordDict;
    audio_base64: string;
    target_to_native: boolean;
    word_buttons: boolean;
    extra_words: string;
}
