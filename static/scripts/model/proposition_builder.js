/**
 * Prepares a proposition's data in json format.
 */
class PropositionBuilder{

    constructor(){
        this.wordDict = {}
        this.recorder = new Recorder()
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

    toJson(){
        return {
            sentence_one : this.sentenceOne,
            sentence_two : this.sentenceTwo,
            word_dict : this.wordDict,
            audio_base64 : this.recorder.base64
        }
    }

}

