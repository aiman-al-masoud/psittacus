import { LessonScheduler } from "../LessonScheduler";
import { getCachedLessonById } from "../../../lesson/Lesson";
import { Context } from "../../../Context";

export default class OldestLessonFirst implements LessonScheduler {

    constructor(
        protected context: Context,
        protected lessonsScores = context.UP.lessonScores()
    ) {
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => s1.last_taken - s2.last_taken)
    }

    async next() {
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => s1.last_taken - s2.last_taken)
        let x = this.lessonsScores[0]
        return await getCachedLessonById(x.lessonId, this.context)
    }

    static getType() {
        return "OldestFirst"
    }

    getType() {
        return "OldestFirst"
    }

    static getDescription(context?: Context) {
        return context?.L.oldest_lesson_first_LS ?? ''
    }

    getDescription(context?: Context) {
        return context?.L.oldest_lesson_first_LS ?? ''
    }


}