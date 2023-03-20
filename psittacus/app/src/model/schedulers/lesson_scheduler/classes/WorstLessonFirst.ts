import { LessonScheduler } from "../LessonScheduler";
import { getCachedLessonById } from "../../../lesson/functions/getCachedLessonById";
import { Context } from "../../../Context";


export default class WorstLessonFirst implements LessonScheduler {

    constructor(
        protected context: Context,
        protected lessonsScores = context.UP.lessonScores()
    ) {
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => s1.overall - s2.overall)
    }

    async next() {
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => s1.overall - s2.overall)
        let x = this.lessonsScores[0]
        return await getCachedLessonById(x.lessonId, this.context)
    }

    static getType() {
        return "WorstLessonFirst"
    }

    getType() {
        return "WorstLessonFirst"
    }

    static getDescription(context?: Context) {
        return context?.L.worst_lesson_first_LS ?? ''
    }

    getDescription(context?: Context) {
        return context?.L.worst_lesson_first_LS ?? ''
    }

}