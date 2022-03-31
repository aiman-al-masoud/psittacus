import Proposition from "../Proposition";
import Scheduler from "./Scheduler";

/**
 * A Scheduler that remembers what Propositions the student 
 * performed poorly in, and proposes them first,  
 * the next time the same Lesson is taken.
 */
export default class Leitner extends Scheduler{

    constructor(lessonJson){
        super(lessonJson)
        this.loadBoxes() 
        this.newBoxes = [[], []] //for next time this lesson is taken
        
        this.counter = 0
        this.highPriorityBox = this.boxes[0]
        this.lowPriorityBox = this.boxes[1]
        this.allPropositionHashes = this.highPriorityBox.concat(this.lowPriorityBox)
        this.current = this.getPropositionByHash(this.allPropositionHashes[0])

    }

    loadBoxes(){
        try{
            this.boxes = JSON.parse( localStorage.getItem(this.lessonId) ).boxes 
        }catch{
            this.boxes = this.initBoxes()
        }
    }

    storeBoxes(){
        localStorage.setItem( this.lessonId, JSON.stringify(  {boxes : this.newBoxes}  ) )
    }

    /**
     * First time ever a lesson is played, 
     * no stored data yet, go with lesson order.
     */
    initBoxes(){
        //two boxes. 0: high priority, 1: student already knows these
        let newBoxes = [[], []]
        let propoHashes = this.propositions.map((p)=>{return p.getHash()})
        let partTwo = propoHashes.splice(propoHashes.length/2)
        newBoxes[0]  = propoHashes
        newBoxes[1]  = partTwo
        return newBoxes
    }

    /**
     * Get a Proposition by its hash.
     * @param {number} propoHash 
     * @returns {Proposition}
     */
    getPropositionByHash(propoHash){
        return this.propositions.filter((p)=>{ return p.getHash()==propoHash })[0]
    }

    isOver(){
        this.isLessonOver? this.storeBoxes() : ""
        console.log(this.dumpScores()) /////TODO: remove
        return super.isOver()
    }

    next(){

        //student screwed up in previous:
        if(this.current.getScore() < Proposition.MIN_PASSING_SCORE){
            this.newBoxes[0].push(this.current.getHash())
        }else{
            this.newBoxes[1].push(this.current.getHash())
        }

        //point to next
        this.counter++
        this.current = this.getPropositionByHash(this.allPropositionHashes[this.counter]) 
        if (!this.current){
            this.current = Proposition.NULL
            this.isLessonOver = true
        }
       
    }









    // static userProgress(){
    //     return JSON.parse(localStorage.getItem("user_progress")) ?? { "lesson_scores":{} }
    // }

    // static lessonScores(){
    //     return this.userProgress().lesson_scores
    // }

    // static async saveScore(lessonId, data){
    //     let p  = this.userProgress()
    //     p.lesson_scores[lessonId] = data
    //     localStorage.setItem("user_progress", p)
    // }

    


  


}