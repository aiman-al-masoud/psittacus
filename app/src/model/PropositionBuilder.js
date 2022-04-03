import {Recorder, playBase64} from "./utilities/Recorder.js"


/**
 * Builds and edits Propositions.
 */
export default class PropositionBuilder{

    constructor(){
        this.wordDict = {} //from target to native
        this.reverseDict = {} //from native to target
        this.recorder = new Recorder()
        this.targetToNative = true; //to be translated from target lang to native by default.
        this.sentenceOne = "" //in target lang
        this.sentenceTwo = "" //in source lang
    }

    /**
    * Alt 'constructor' that takes in a json in the format produced by 'toJson'.
    */
    static fromExistingJson(jsonData){
        let pb = new PropositionBuilder()
        pb.sentenceOne = jsonData.sentence_one
        pb.sentenceTwo = jsonData.sentence_two
        pb.wordDict = jsonData.word_dict
        pb.reverseDict = jsonData.reverse_dict??{}
        pb.recorder.base64 = jsonData.audio_base64
        pb.targetToNative = jsonData.target_to_native??true
        return pb
    }

    toJson(){
        return {
            sentence_one : this.sentenceOne,
            sentence_two : this.sentenceTwo,
            word_dict : this.wordDict,
            reverse_dict : this.reverseDict,
            audio_base64 : this.recorder.base64,
            target_to_native  : this.targetToNative,
        }
    }

    /**
     * Sentence in the Target Language.
     * Taget Language: the language this lesson is trying to teach.
     * @param {string} sentence_one 
     * @returns 
     */
    setSentenceOne(sentence_one){
        this.sentenceOne = sentence_one
        return this
    }

    /**
     * Sentence in the Source Language.
     * Source Language: the language that the student already knows.
     * @param {string} sentence_two 
     * @returns 
     */
    setSentenceTwo(sentence_two){
        this.sentenceTwo = sentence_two
        return this
    }

    /**
     * Record audio in target language.
     */
    record(){
        this.recorder.record()
        return this
    }

    /**
     * Stop recording audio.
     */
    stopRecording(){
        this.recorder.stop()
        return this
    }

    /**
     * Is the proposition being built still empty?
     */
    isEmpty(){
        return !(this.sentenceOne && this.sentenceTwo)
    }

    /**
     * Do a sound test after recording yourself.
     */
    playAudio = ()=>{
        playBase64(this.recorder.base64)
    }

    /**
     * By default, user is asked to translate target to native, 
     * this method inverts the order.
     */
    invertTranslationDirection(){
        this.targetToNative = !this.targetToNative;
        return this
    }

}

