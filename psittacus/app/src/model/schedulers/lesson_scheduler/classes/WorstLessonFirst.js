import LessonScheduler from "../LessonScheduler";
import L from "../../../utilities/Language";
import { getCachedLessonById } from "../../../lesson/Lesson";


export default class WorstLessonFirst extends LessonScheduler{

    constructor(){
        super()
        this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.overall - s2.overall  } )  
    }

    async next(){
        this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.overall - s2.overall  } )  
        let x = this.lessonsScores[0]
        return await getCachedLessonById(x.id) /*  getCachedLessonById(x.id) */
    }

    static getType(){
        return "Worst First"
    }


    static getDescription(){
        return L.worst_lesson_first_LS
    }


}