class LessonBuilder{
    
    constructor(){
        this.propositions = [new PropositionBuilder()]
        this.current = 0
    }

    /**
     * Alt 'constructor' that takes in a json in the format produced by 'toJson'.
     */
    static fromExistingJson(jsonData){
        let lb = new LessonBuilder()
        lb.propositions = jsonData.propositions.map((p)=> {return PropositionBuilder.fromExistingJson(p)}) 
        lb.targetLanguage = jsonData.target_language??""
        lb.sourceLanguage = jsonData.source_language??""
        lb.author = jsonData.author??""
        return lb  
    }


    getCurrent(){
        return this.propositions[this.current]
    }

    next(){

        //no new proposition if current one is incomplete
        if( !(this.propositions[this.current].sentenceOne && this.propositions[this.current].sentenceTwo)  ){
            return
        }

        this.current++
        this.propositions[this.current] = this.propositions[this.current] ?? new PropositionBuilder()
    }

    
    prev(){
        this.current = this.propositions[this.current-1]==undefined? this.current : this.current-1
    }

    toJson(){
        return {   
        target_language : this.targetLanguage??"",
        source_language : this.sourceLanguage??"",
        author : this.author??"",  
        last_modified : new Date().getTime(),
        propositions : this.propositions.filter((p)=> !p.isEmpty()  ) .map((p)=> p.toJson())
        }
    }

}

