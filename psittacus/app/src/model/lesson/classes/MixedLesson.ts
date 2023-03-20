import { Context } from "../../Context"
import { Proposition, nullProposition } from "../../proposition/Proposition"
import { LessonProgressData } from "../../UserProgress"
import { getCachedLessonById } from "../functions/getCachedLessonById"
import { Lesson } from "../Lesson"

/**
 * Helps creating a Lesson that is an admixture of 
 * Propositions from different cached Lessons.
 */
export default class MixedLesson implements Lesson {

    protected lessons: Lesson[] = []
    protected propositions: Proposition[] = []
    protected explanationText = ''
    readonly scheduler = this.context.propoSchedFac.get(this)

    constructor(
        readonly context: Context,
    ) {
    }

    /**
     * 
     * @param {string} lessonId 
     * @param {[number]} propositionHashes 
     */
    async addLesson(lessonId: string, propositionHashes: number[], context: Context) {
        let lesson = await getCachedLessonById(lessonId, context)
        this.lessons.push(lesson)
        this.propositions.push(...lesson.getPropositions().filter(p => propositionHashes.includes(p.getHash())))
    }

    next() {
        this.scheduler?.next()
    }

    getCurrent() {
        return this.scheduler?.getCurrent() ?? nullProposition
    }

    isOver() {

        let over = this.scheduler?.isOver() ?? false //TODO?

        if (over) {

            for (let lesson of this.lessons) {

                const oldScores = this.context?.UP.scoresForLesson(lesson.getId()) ?? { propositions: [], overall: 0, lessonId: lesson.getId() }
                const newScores = lesson.dumpScores()

                oldScores.propositions = oldScores.propositions.sort((p1, p2) => p1[0] - p2[0])
                newScores.propositions = newScores.propositions.sort((p1, p2) => p1[0] - p2[0])

                //if score undefined in newScores, substitute it w/ corresponding one in oldScores.
                newScores.propositions = newScores.propositions.map((p, index) => [p[0], p[1] ?? oldScores.propositions[index][1]])
                newScores.overall = newScores.propositions.map(p => p[1]).reduce((s1, s2) => s1 + s2) / newScores.propositions.length

                this.context?.UP.saveLessonScore(lesson.getId(), newScores)
            }
        }

        return over
    }

    getScore() {
        return parseInt((this.propositions.map((p) => p.getScore()).reduce((a, b) => a + b) / this.propositions.length) + '')
    }

    getId(): string {
        return 'MixedLesson'//TODO!
    }

    getExplaination(): string {
        return this.explanationText
    }

    getPropositions(): Proposition[] {
        return this.propositions
    }

    dumpScores(): LessonProgressData {
        return {} as any
    }

    saveScore(): void {

    }

    async cacheLesson(): Promise<void> {

    }

}