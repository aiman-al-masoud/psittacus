/**
 * Prepares a proposition's data in json format.
 */
class PropositionBuilder{

    constructor(){
        this.wordDict = {}
        this.recorder = new Recorder()
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

    toJson(){
        return {
            sentence_one : this.sentenceOne,
            sentence_two : this.sentenceTwo,
            word_dict : this.wordDict,
            audio_base64 : this.recorder.base64
        }
    }

}