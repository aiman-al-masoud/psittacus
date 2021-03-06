import Lesson from "../../../lesson/Lesson";
import LessonScheduler from "../LessonScheduler";
import L from "../../../utilities/Language";


export default class WorstLessonFirst extends LessonScheduler{

    constructor(){
        super()
        this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.overall - s2.overall  } )  
    }

    async next(){
        this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.overall - s2.overall  } )  
        let x = this.lessonsScores[0]
        return await Lesson.getCachedLessonById(x.id)
    }

    static getType(){
        return "Worst First"
    }


    static getDescription(){
        return L.worst_lesson_first_LS
    }


}