import { Proposition } from '../../proposition/Proposition';
import { getProposition } from '../../proposition/Proposition';
import { LessonData } from "../../formats/LessonData";
import { LessonProgressData } from '../../UserProgress';
import { Context } from '../../Context';
import { Lesson } from '../Lesson';

export class BaseLesson implements Lesson {

    readonly explanationText = this.data.explanation.text;
    readonly metadata = this.data.metadata;
    readonly propositions = this.data.propositions.map(p => getProposition(p, this.context));
    readonly scheduler = this.context.propoSchedFac.get(this);

    constructor(
        readonly data: LessonData,
        readonly context: Context
    ) {
    }

    /**
     * Point to the next proposition.
     */
    next() {
        this.scheduler.next();
    }

    /**
     * Get the current Proposition.
     */
    getCurrent() {
        return this.scheduler.getCurrent();
    }

    /**
     * Is this lesson over yet?
     */
    isOver() {
        const over = this.scheduler.isOver();

        if (over) { //if this lesson is over, save the score and cache the lesson
            this.saveScore();
            this.cacheLesson();
        }

        return over;
    }

    saveScore(): void {
        this.context?.UP.saveLessonScore(this.getId(), this.dumpScores());
    }

    /**
     * Get Lesson's overall score.
     */
    getScore() {
        return parseInt((this.propositions.map((p) => p.getScore()).reduce((a, b) => a + b) / this.propositions.length) + '');
    }

    /**
     * Nominally identifies a Lesson.
     */
    getId() {
        return `author=${this.metadata.author};target_language=${this.metadata.target_language};source_language=${this.metadata.source_language};title=${this.metadata.title};`;
    }

    /**
    * Dumps info relative to the user's performance with this Lesson.
    */
    dumpScores(): LessonProgressData {

        return {
            last_taken: new Date().getTime(),
            overall: this.getScore(),
            propositions: this.propositions.map(p => [p.getHash(), p.getScore()]),
            lessonId: this.getId()
        };

    }

    /**
     * Cache this Lesson, overwriting it in case of conflicting ids.
     */
    async cacheLesson() {

        this.context?.db.delete('cachedLessons', this.getId());

        this.context?.db.add('cachedLessons', {
            id: this.getId(),
            lesson: this.data,
        });

    }

    getExplaination(): string {
        return this.explanationText;
    }

    getPropositions(): Proposition[] {
        return this.propositions;
    }
}
