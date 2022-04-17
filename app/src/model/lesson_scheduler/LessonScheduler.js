import Lesson from "../lesson/Lesson";
import UserProgress from "../utilities/UserProgress";

/**
 * Abstract Class.
 * 
 * Subclasses should implement `next()`
 */
export default class LessonScheduler{

    constructor(){
        this.lessonsScores = UserProgress.lessonsScores()
    }

    /**
     * Get the next suggested Lesson.
     * 
     * Subclasses must override it.
     * 
     * @returns {Lesson}
     */
    async next(){
        throw new Error("LessonScheduler: next() not implemented!")
    }

    static getType(){
        throw new Error("LessonScheduler: is an abstract class!")
    }


}