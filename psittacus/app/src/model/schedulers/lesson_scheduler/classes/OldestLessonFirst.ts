import { LessonScheduler } from "../LessonScheduler";
import { getCachedLessonById } from "../../../lesson/Lesson";
import { Context } from "../../../Context";
import { LessonProgressData } from "../../../UserProgress";
// import L from "../../../utilities/Language";

export default class OldestLessonFirst implements LessonScheduler {

    constructor(protected lessonsScores: LessonProgressData[]) {
        // super()
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => { return s1.last_taken - s2.last_taken })
        // console.log(this.lessonsScores)
    }

    async next() {
        this.lessonsScores = this.lessonsScores.sort((s1, s2) => { return s1.last_taken - s2.last_taken })
        let x = this.lessonsScores[0]
        return await getCachedLessonById(x.lessonId)
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