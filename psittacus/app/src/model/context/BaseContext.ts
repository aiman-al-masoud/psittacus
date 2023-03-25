import { getIcons } from "../../../res/icons/Icons"
import { getSounds } from "../../../res/sounds/Sounds"
import { LessonBuilder, getLessonBuilder } from "../lesson/builder/LessonBuilder"
import { getLesson } from "../lesson/Lesson"
import { getLessonSchedulerFactory } from "../schedulers/lesson_scheduler/LessonSchedulerFactory"
import { getPropoSchedulerFactory } from "../schedulers/proposition_scheduler/PropoSchedulerFactory"
import { getUrlTracker } from "../utilities/UrlTracker"
import { getDatabase } from "../utilities/Database"
import { readText } from "../utilities/readText"
import { getServer } from "../utilities/Server"
import { Context, GetContextArgs } from "./Context"
import { Page, settingsKeys } from "../settings/Keys"

export class BaseContext implements Context {

    protected currentPage?: Page

    readonly urlTracker = getUrlTracker(this)
    readonly icons = getIcons()
    readonly sounds = getSounds()
    readonly server = getServer(this)
    readonly propoSchedFac = getPropoSchedulerFactory(this)
    readonly lessonSchedFac = getLessonSchedulerFactory(this)
    readonly db = getDatabase()
    protected lessonBuilder: LessonBuilder | undefined = this.opts.lessonBuilder ?? getLessonBuilder({}, this)

    constructor(
        readonly opts: GetContextArgs,
        readonly UP = opts.UP,
        readonly inputTypes = opts.S.inputTypes,
        protected contextDict = {} as any
    ) {
    }

    get L() {
        return this.opts.langPacks[this.opts.S.get('APP_LANGUAGE')]
    }

    get availableLangs() {
        return Object.keys(this.opts.langPacks)
    }

    getLessonBuilder(): LessonBuilder {
        return this.lessonBuilder ?? (this.lessonBuilder = getLessonBuilder({}, this))
    }

    setLessonBuilder(lessonBuilder: LessonBuilder): void {
        this.lessonBuilder = lessonBuilder
        this.forceUpdate()
    }

    clearLessonBuilder(): void {
        this.lessonBuilder = undefined
    }

    set(key: any, value: any): void {

        if (settingsKeys.includes(key as any)) {
            this.opts.S.set(key as any, value as any)
        } else {
            this.contextDict[key] = value
        }

        this.forceUpdate()

    }

    get(key: any): any {

        if (settingsKeys.includes(key)) {
            return this.opts.S.get(key)
        } else {
            return this.contextDict[key]
        }

    }

    getPage(): Page {

        if (!this.currentPage) {
            throw 'No currentPage in Context!'
        }

        return this.currentPage
    }

    async setPage(page: Page): Promise<void> {

        if (page === 'open-lesson') {
            const lez = getLesson(JSON.parse(await readText()), this) //if lesson not already there, ask upload file
            this.set('LESSON', lez)
        }

        if (page === 'edit-lesson') {
            let lez = getLessonBuilder(JSON.parse(await readText()), this)
            this.setLessonBuilder(lez)
        }

        if (page === 'craft-new-lesson') {
            this.clearLessonBuilder()
        }

        this.urlTracker.change(this.currentPage ?? 'menu', page)
        this.currentPage = page
        this.forceUpdate()
    }

    setForceUpdate(forceUpdate: () => void): void {
        this.opts.forceUpdate = forceUpdate
    }

    forceUpdate = (): void => {
        this.opts?.forceUpdate?.()
    }
}
