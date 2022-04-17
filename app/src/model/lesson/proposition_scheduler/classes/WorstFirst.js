import Proposition from "../../proposition/Proposition"
import PropositionScheduler from "../PropositionScheduler"
import UserProgress from "../../../utilities/UserProgress"

/**
 * A `Scheduler` with memory, that plays `Propositions`
 * sorted ascendingly by the score the user got on each, last time they took the same `Lesson`.
 * 
 * Letting the user see the ones they need to revise the most first, thus leveraging the Primacy Effect.
 * 
 * https://en.wikipedia.org/wiki/Serial-position_effect
 */
export default class WorstFirst extends PropositionScheduler{

    constructor(lessonId, propositions){
        super(lessonId, propositions)
        this.counter = 0
        this.current = this.propositions[this.counter]
    }

    /**
     * Load back past scores and decide a repeptition strategy (sequence of Propositions)
     */
    initSequence(){
        super.initSequence()

        try{
            let propoScores = UserProgress.scoresForLesson(this.lessonId).propositions
            propoScores = propoScores.sort((p1, p2)=> {return p1[1] - p2[1] } ) //sort by score (index=1)            
            let hashes = propoScores.map((p)=>{return p[0]}) //get hashes (index=0)
            this.propositions = this.propositions.sort((p1, p2)=>{ return hashes.indexOf(p1.getHash()) - hashes.indexOf(p2.getHash())    }  )
        }catch{
            console.log(`${this.constructor.name}: failed to sort propositions by old scores. Normal if it's the first time user takes lesson w/ this id.`)
        }
    }

    next(){

        this.counter++
        this.current = this.propositions[this.counter]
        if (!this.current){
            this.current = Proposition.NULL
            this.isLessonOver = true
        }
       
    }

    static getType(){
        return "Worst First"
    }

    

}