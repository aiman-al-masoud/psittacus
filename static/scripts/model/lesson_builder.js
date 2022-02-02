class LessonBuilder{
    
    constructor(){
        this.propositions = [new PropositionBuilder()]
        this.current = 0
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
        return {    propositions : this.propositions.filter((p)=> !p.isEmpty()  ) .map((p)=> p.toJson()) }
    }

}