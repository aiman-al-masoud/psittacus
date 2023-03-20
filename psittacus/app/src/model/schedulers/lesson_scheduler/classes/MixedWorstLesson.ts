
import { Context } from "../../../Context";
import MixedLesson from "../../../lesson/MixedLesson";

import { MIN_PASSING_SCORE, Proposition } from "../../../proposition/Proposition";
import { LessonProgressData } from "../../../UserProgress";
import { LessonScheduler } from "../LessonScheduler";

/**
 * Creates a `MixedLesson` from the top `Proposition`s the student performed the worst on.
 */
export default class MixedWorstLesson implements LessonScheduler {

    constructor(protected lessonsScores: LessonProgressData[]) {

    }

    async next() {

        this.lessonsScores = this.lessonsScores.sort((s1, s2) => s1.overall - s2.overall)  //sort by score
        let n = 5
        this.lessonsScores.splice(n) //worst n lessons

        let ml = new MixedLesson()

        for (let s of this.lessonsScores) {
            let hashes = s.propositions.filter(p => p[1] < MIN_PASSING_SCORE).map(p => p[0])               //sort((p1, p2)=>{return p1[1] - p2[1]  })
            await ml.addLesson(s.lessonId, hashes)
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