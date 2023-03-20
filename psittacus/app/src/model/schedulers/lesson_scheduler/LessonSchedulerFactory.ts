// import S from "../../utilities/Settings"

import { LessonScheduler } from "./LessonScheduler"

//@ts-ignore
import ClassLoader from "../../utilities/ClassLoader"
import { Lesson } from "../../lesson/Lesson"
// const schedulers = Object.fromEntries(require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/)).map(s => { return [s.default.getType(), s.default] }))

import { Context } from "../../Context"

import WorstLessonFirst from "./classes/WorstLessonFirst"
import MixedWorstLesson from "./classes/MixedWorstLesson"
import OldestLessonFirst from "./classes/OldestLessonFirst"

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

const CATEGORY_CUSTOM_CODE = "LessonScheduler"

class BaseLessonSchedulerFactory implements LessonSchedulerFactory {


    readonly schedulers: { [x: string]: Constructor<LessonScheduler> } = { OldestLessonFirst, MixedWorstLesson, WorstLessonFirst }

    constructor(readonly context: Context) {

    }

    get() {


        // try {
        // return new schedulers[S.getInstance().get(S.LESSON_SCHEDULER)]()

        return new this.schedulers[this.context.get('LESSON_SCHEDULER')](this.context.UP.lessonScores())

        // } catch {
        // return new schedulers[this.getTypes()[0]]()
        // }

    }

    getTypes() {
        return Object.keys(this.schedulers)
    }


    describeCurrent() {
        // let clazz = schedulers[S.getInstance().get(S.LESSON_SCHEDULER)] ?? schedulers[this.getTypes()[0]]
        // return clazz.getDescription()
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
            // let x = clazz.getType
            // clazz.getType = () => { return `${x()} (CUSTOM)` }
            // schedulers[clazz.getType()] = clazz
        }
    }

    getTemplate(): string {
        return "class MyLessonScheduler{\n\n next(){ }\n\nstatic getType(){}\n\nstatic getDescription(){} \n\n}"
    }

}

// LessonSchedulerFactory.reloadCustomSchedulers()

