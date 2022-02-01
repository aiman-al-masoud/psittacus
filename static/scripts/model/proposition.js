class Proposition{

    constructor(jsonData){
        // this.jsonData  = jsonData
        this.sentenceOne = jsonData.sentence_one
        this.sentenceTwo = jsonData.sentence_two
        this.audioBase64 = jsonData.audio_base64
        this.wordDict = jsonData.word_dict

    }

    play(){
        playBase64(this.audioBase64)
    }

    check(users_translation){
        let counter = 0;
        for (let userWord in users_translation.split(/\s+/)){
            if (userWord in this.sentenceTwo.split(/\s+/)){
                counter++
            }
        }
        return parseInt(100 *  counter/this.sentenceTwo.split(/\s+/).length)
    }

}