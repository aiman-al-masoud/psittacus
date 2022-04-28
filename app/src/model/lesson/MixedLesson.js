import UserProgress from "../utilities/UserProgress";
import Lesson from "./Lesson";
import PropositionSchedulerBuilder from "../schedulers/proposition_scheduler/PropositionSchedulerBuilder";

/**
 * Helps creating a Lesson that is an admixture of 
 * Propositions from different cached Lessons.
 */
export default class MixedLesson {
   
    constructor() {
        this.lessons = []
        this.propositions = []
        this.explanationText = ""
        // this.metadata = {}
    }

    /**
     * 
     * @param {string} lessonId 
     * @param {[number]} propositionHashes 
     */
    async addLesson(lessonId, propositionHashes){
        let lesson = await Lesson.getCachedLessonById(lessonId)   
        this.lessons.push(lesson)
        this.propositions=  this.propositions.concat( lesson.propositions.filter(p=>{return propositionHashes.includes(p.getHash())})  )
        this.scheduler = PropositionSchedulerBuilder.getScheduler(undefined, this.propositions)
    }

    next(){
        this.scheduler.next()
    }

    getCurrent(){
        return this.scheduler.getCurrent()
    }

    isOver(){
        let over = this.scheduler.isOver()

        if(over){
            
            for(let lesson of this.lessons){
                let oldScores = UserProgress.scoresForLesson(lesson.getId())
                let newScores = lesson.dumpScores()

                oldScores.propositions = oldScores.propositions.sort((p1, p2)=>{return p1[0]-p2[0]  }  )
                newScores.propositions = newScores.propositions.sort((p1, p2)=>{return p1[0]-p2[0]  }  )

                //if a score in undefined in newScores, substitute it 
                //with the corresponding one in oldScores.
                newScores.propositions = newScores.propositions.map((p, index)=> { return [p[0], p[1]??oldScores.propositions[index][1]  ] }  )
                newScores.overall = newScores.propositions.map(p=>p[1]).reduce((s1, s2)=>s1+s2)/newScores.propositions.length

                UserProgress.saveLessonScore(lesson.getId(), newScores)
            }
        }

        return over
    }

    getScore(){
        return parseInt(this.propositions.map((p) => { return p.getScore() }).reduce((a, b) => { return a + b }) / this.propositions.length)
    }



}