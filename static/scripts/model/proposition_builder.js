class PropositionBuilder{

    constructor(){
        this.word_dict = {}
        this.recorder = new Recorder()
    }

    setSentenceOne(sentence_one){
        this.sentence_one = sentence_one
        return this
    }

    setSentenceTwo(sentence_two){
        this.sentence_two = sentence_two
        return this
    }

    setDefinition(word, definition){
        this.word_dict[word] = definition
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
            sentence_one : this.sentence_one,
            sentence_two : this.sentence_two,
            word_dict : this.word_dict,
            audio_base64 : this.recorder.base64
        }
    }

}