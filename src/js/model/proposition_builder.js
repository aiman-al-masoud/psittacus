import {Recorder, playBase64} from "./recorder.js"
export {PropositionBuilder}

/**
 * Prepares a proposition's data in json format.
 */
class PropositionBuilder{

    constructor(){
        this.wordDict = {}
        this.recorder = new Recorder()
        this.targetToNative = true; //to be translated from target lang to native by default.
    }

    /**
    * Alt 'constructor' that takes in a json in the format produced by 'toJson'.
    */
    static fromExistingJson(jsonData){
        let pb = new PropositionBuilder()
        pb.sentenceOne = jsonData.sentence_one
        pb.sentenceTwo = jsonData.sentence_two
        pb.wordDict = jsonData.word_dict
        pb.recorder.base64 = jsonData.audio_base64
        pb.targetToNative = jsonData.target_to_native??true
        return pb
    }

    setSentenceOne(sentence_one){
        this.sentenceOne = sentence_one
        return this
    }

    setSentenceTwo(sentence_two){
        this.sentenceTwo = sentence_two
        return this
    }

    setDefinition(word, definition){
        this.wordDict[word] = definition
        return this
    }

    record(){
        this.recorder.record()
        return this
    }

    stopRecording(){
        this.recorder.stop()
        return this
    }

    isEmpty(){
        return !(this.sentenceOne && this.sentenceTwo)
    }

    playAudio(){
        playBase64(this.recorder.base64)
    }

    /**
     * By default, the user should be asked to translate target to native, this method inverts the order.
     */
    invertTranslationDirection(){
        this.targetToNative = !this.targetToNative;
    }


    toJson(){
        return {
            sentence_one : this.sentenceOne,
            sentence_two : this.sentenceTwo,
            word_dict : this.wordDict,
            audio_base64 : this.recorder.base64,
            target_to_native  : this.targetToNative
        }
    }

}

