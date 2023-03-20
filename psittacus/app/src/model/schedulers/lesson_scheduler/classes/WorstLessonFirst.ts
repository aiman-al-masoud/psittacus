import { LessonScheduler } from "../LessonScheduler";
// import L from "../../../utilities/Language";
import { getCachedLessonById } from "../../../lesson/Lesson";
import { Context } from "../../../Context";
import { LessonProgressData } from "../../../UserProgress";


export default class WorstLessonFirst implements LessonScheduler {

    constructor(protected lessonsScores: LessonProgressData[]) {
        // super()
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => { return s1.overall - s2.overall })
    }

    async next() {
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => { return s1.overall - s2.overall })
        let x = this.lessonsScores[0]
        return await getCachedLessonById(x.lessonId) /*  getCachedLessonById(x.id) */
    }

    static getType() {
        return "WorstFirst"
    }

    getType() {
        return "WorstFirst"
    }

    static getDescription(context?: Context) {
        return context?.L.worst_lesson_first_LS ?? ''
    }

    getDescription(context?: Context) {
        return context?.L.worst_lesson_first_LS ?? ''
    }

}