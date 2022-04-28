import MixedLesson from "../../../lesson/MixedLesson";
import Proposition from "../../../proposition/Proposition";
import LessonScheduler from "../LessonScheduler";
import L from "../../../utilities/Language";

/**
 * Creates a `MixedLesson` from the top `Proposition`s the student performed the worst on.
 */
export default class MixedWorstLesson extends LessonScheduler {

    static getType() {
        return "Mixed Worst"
    }

    async next() {
        
        this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.overall - s2.overall  } )  //sort by score
        let n = 5
        this.lessonsScores.splice(n) //worst n lessons

        let ml = new MixedLesson()

        for(let s of this.lessonsScores){
            let hashes = s.propositions.filter(p=>{return p[1] < Proposition.MIN_PASSING_SCORE  }).map(p=>p[0])               //sort((p1, p2)=>{return p1[1] - p2[1]  })
            await ml.addLesson(s.id,  hashes)
        }
        
        return ml
    }

    static getDescription(){
        return L.mixed_worst_lesson_LS
    }

}