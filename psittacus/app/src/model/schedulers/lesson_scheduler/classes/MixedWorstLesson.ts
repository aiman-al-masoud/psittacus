
import { Context } from "../../../context/Context";
import { MIN_PASSING_SCORE } from "../../../proposition/Proposition";
import { LessonScheduler } from "../LessonScheduler";
import MixedLesson from "../../../lesson/classes/MixedLesson";

/**
 * Creates a `MixedLesson` from the top `Proposition`s the student performed the worst on.
 */
export default class MixedWorstLesson implements LessonScheduler {

    constructor(
        readonly context: Context,
        protected lessonsScores = context.UP.lessonScores()
    ) {

    }

    async next() {

        this.lessonsScores = this.lessonsScores.sort((s1, s2) => s1.overall - s2.overall)  //sort by score
        let n = 5
        this.lessonsScores.splice(n) //worst n lessons

        let ml = new MixedLesson(this.context)

        for (let s of this.lessonsScores) {
            let hashes = s.propositions.filter(p => p[1] < MIN_PASSING_SCORE).map(p => p[0])               //sort((p1, p2)=>{return p1[1] - p2[1]  })
            await ml.addLesson(s.lessonId, hashes, this.context)
        }

        if (ml.getPropositions().length === 0) {
            throw 'MixedWorstLesson: no more propositions from MixedLesson!'
        }

        return ml
    }

    static getType() {
        return "MixedWorst"
    }

    getType() {
        return "MixedWorst"
    }

    static getDescription(context?: Context) {
        return context?.L.mixed_worst_lesson_LS ?? ''
    }

    getDescription(context?: Context) {
        return context?.L.mixed_worst_lesson_LS ?? ''
    }

}