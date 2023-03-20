import { LessonScheduler } from "./LessonScheduler"
import { Context } from "../../context/Context"
import WorstLessonFirst from "./classes/WorstLessonFirst"
import MixedWorstLesson from "./classes/MixedWorstLesson"
import OldestLessonFirst from "./classes/OldestLessonFirst"

//@ts-ignore
import ClassLoader from "../../utilities/ClassLoader"

export interface LessonSchedulerFactory {
    get(): LessonScheduler
    getTypes(): string[]
    describeCurrent(): string
    add(sourceCode: string): void
    getTemplate(): string
}

export function getLessonSchedulerFactory(context: Context): LessonSchedulerFactory {
    return new BaseLessonSchedulerFactory(context)
}

type Constructor<T> = new (...args: any[]) => T

const CATEGORY_CUSTOM_CODE = 'LessonScheduler'

class BaseLessonSchedulerFactory implements LessonSchedulerFactory {


    readonly schedulers: { [x: string]: Constructor<LessonScheduler> } = { OldestLessonFirst, MixedWorstLesson, WorstLessonFirst }

    constructor(readonly context: Context) {
        // this.reload() //TODO!
    }

    get() {
        return new this.schedulers[this.context.get('LESSON_SCHEDULER')](this.context /* this.context.UP.lessonScores() */)
    }

    getTypes() {
        return Object.keys(this.schedulers)
    }

    describeCurrent() {
        return (this.schedulers[this.context.get('LESSON_SCHEDULER')] as any).getDescription(this.context)
    }

    add(sourceCode: string) {
        ClassLoader.storeCustomCode(CATEGORY_CUSTOM_CODE, sourceCode)
    }

    async reload() {
        let manySourceCodes = await ClassLoader.sourceCodesByCategory(CATEGORY_CUSTOM_CODE)

        for (let s of manySourceCodes) {
            let clazz = await new ClassLoader().fromSourceCode(s.sourceCode)
            this.schedulers[`${clazz.getType()} (CUSTOM)`] = clazz
        }
    }

    getTemplate(): string {
        return "class MyLessonScheduler{\n\n next(){ }\n\nstatic getType(){}\n\nstatic getDescription(){} \n\n}"
    }

}


