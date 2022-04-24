import Lesson from "../../lesson/Lesson";
import MixedLesson from "../../lesson/MixedLesson";
import Proposition from "../../lesson/proposition/Proposition";
import PropositionSchedulerBuilder from "../../lesson/proposition_scheduler/PropositionSchedulerBuilder";
import LessonScheduler from "../LessonScheduler";

/**
 * Creates a `MixedLesson` from the top `Proposition`s the student performed the worst on.
 */
export default class MixedWorstLesson extends LessonScheduler {

    constructor() {
        super()
    }

    static getType() {
        return "Mixed Worst"
    }

    async next() {
        // this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.overall - s2.overall  } )  //sort by score
        // this.lessonsScores.splice(5) //worst n lessons
        // let hashes = this.lessonsScores.flatMap(lez=>lez.propositions).sort((p1, p2)=>{return p1[1] - p2[1]  }).filter(p=>{return p[1] < Proposition.MIN_PASSING_SCORE   }).flatMap(p=>p[0])   //worst propositions
        // let lessonIds = this.lessonsScores.map(l=>l.id)
        // let lessons =  []

        // for(let id of lessonIds){
        //     lessons.push(   await Lesson.getCachedLessonById(id))
        // }

        // let propositions = lessons.flatMap(l=>l.propositions)
        // propositions = propositions.filter(p=>{return  hashes.includes(p.getHash()) })
        // propositions = propositions.sort(() => Math.random() - 0.5) //shuffle

        // let newLesson = await Lesson.getCachedLessonById(lessonIds[0])
        // newLesson.propositions = propositions
        // newLesson.scheduler = PropositionSchedulerBuilder.getScheduler(undefined, propositions)
        // return newLesson

        let ml = new MixedLesson()
        await ml.addLesson("capraitalianenglishprima", [3390])
        await ml.addLesson("capraitalianenglishseconda", [2851 /*,946*/])
        
        return ml
    }

}