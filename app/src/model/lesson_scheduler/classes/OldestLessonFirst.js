import Lesson from "../../lesson/Lesson";
import LessonScheduler from "../LessonScheduler";

export default class OldestLessonFirst extends LessonScheduler{

    constructor(){
        super()
        this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.last_taken - s2.last_taken  } )  
        // console.log(this.lessonsScores)
    }

    async next(){
        this.lessonsScores = this.lessonsScores.sort( (s1, s2) => {return s1.last_taken - s2.last_taken  } )  
        let x = this.lessonsScores[0]
        return await Lesson.getCachedLessonById(x.id)
    }

    static getType(){
        return "Oldest First"
    }


    static getDescription(){
        return "Descption for Oldest Lesson ..."
    }


}