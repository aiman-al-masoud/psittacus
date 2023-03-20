import { Context } from "../Context";
import { NullProposition, Proposition } from "../proposition/Proposition";
import { PropositionScheduler } from "../schedulers/proposition_scheduler/PropositionScheduler";
import { LessonProgressData } from "../UserProgress";
import { getCachedLessonById, Lesson } from "./Lesson";

/**
 * Helps creating a Lesson that is an admixture of 
 * Propositions from different cached Lessons.
 */
export default class MixedLesson implements Lesson {

    protected lessons: Lesson[] = []
    protected propositions: Proposition[] = []
    protected explanationText = ''
    protected scheduler?: PropositionScheduler

    /**
     * 
     * @param {string} lessonId 
     * @param {[number]} propositionHashes 
     */
    async addLesson(lessonId: string, propositionHashes: number[]) {
        let lesson = await getCachedLessonById(lessonId)
        this.lessons.push(lesson)
        this.propositions.push(...lesson.getPropositions().filter(p => propositionHashes.includes(p.getHash())))
    }

    next() {
        this.scheduler?.next()
    }

    getCurrent() {
        return this.scheduler?.getCurrent() ?? NullProposition
    }

    isOver(context: Context) {

        let over = this.scheduler?.isOver() ?? false //TODO?

        if (over) {

            for (let lesson of this.lessons) {

                const oldScores = context.UP.scoresForLesson(lesson.getId())

                let newScores = lesson.dumpScores()

                oldScores.propositions = oldScores.propositions.sort((p1: any, p2: any) => p1[0] - p2[0])//TODO:? order maybe wrong?
                newScores.propositions = newScores.propositions.sort((p1: any, p2: any) => p1[0] - p2[0])//TODO:? order maybe wrong?

                //if a score in undefined in newScores, substitute it 
                //with the corresponding one in oldScores.
                newScores.propositions = newScores.propositions.map((p, index) => { return [p[0], p[1] ?? oldScores.propositions[index][1]] })
                newScores.overall = newScores.propositions.map(p => p[1]).reduce((s1, s2) => s1 + s2) / newScores.propositions.length

                context.UP.saveLessonScore(lesson.getId(), newScores)
            }
        }

        return over
    }

    getScore() {
        return parseInt((this.propositions.map((p) => { return p.getScore() }).reduce((a, b) => { return a + b }) / this.propositions.length) + '')
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

    saveScore(context: Context): void {

    }

    async cacheLesson(): Promise<void> {

    }

    setScheduler(context: Context): void {
        this.scheduler = context.propoSchedFac.get(this)
    }

}