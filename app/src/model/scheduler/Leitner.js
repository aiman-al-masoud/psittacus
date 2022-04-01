import Proposition from "../Proposition";
import Scheduler from "./Scheduler";
import UserProgress from "./UserProgress";

/**
 * A Scheduler with memory, that plays the Propositions 
 * sorted ascendingly by the score the user got on each during 
 * the last lesson.
 */
export default class Leitner extends Scheduler{

    constructor(lessonJson){
        super(lessonJson)
        this.initSequence()     
        this.counter = 0
        this.current = this.getPropositionByHash(this.sequence[0])
    }

    /**
     * Load back past scores and decide a repeptition strategy (sequence of Propositions)
     */
    initSequence(){

        try{
            let propoScores = UserProgress.lessonScores()[this.lessonId].propositions
            propoScores = propoScores.sort((p1, p2)=> {return p1[1] - p2[1] } )
            this.sequence = propoScores.map((p)=>{return p[0]})
        }catch{
            this.sequence =  this.propositions.map((p)=>{return p.getHash()})
        }
    }

    /**
     * Get a Proposition by its hash.
     * @param {number} propoHash 
     * @returns {Proposition}
     */
    getPropositionByHash(propoHash){
        return this.propositions.filter((p)=>{ return p.getHash()==propoHash })[0]
    }

    next(){

        this.counter++
        this.current = this.getPropositionByHash(this.sequence[this.counter]) 
        if (!this.current){
            this.current = Proposition.NULL
            this.isLessonOver = true
        }
       
    }
    

}