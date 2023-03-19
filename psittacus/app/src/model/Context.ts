import { BooleanSettingsKeys, getSettings, GetSettingsArgs, InputType, InputTypeKeys, Settings, settingsKeys, SettingsKeys, StringSettingsKeys } from "./Settings"
import { getUserProgress, UserProgress } from "./UserProgress"
import { LangPack } from "../../res/lang_packs/LangPack"
import { english } from "../../res/lang_packs/english"
import { italian } from "../../res/lang_packs/italian"
import { spanish } from "../../res/lang_packs/spanish"
import { getLessonBuilder, LessonBuilder } from "./lesson/LessonBuilder"
import { Lesson } from "./lesson/Lesson"
import { stringLiterals, ElementType } from "./utilities/stringLiterals"


export const booleanContextKeys = stringLiterals('RECORDING', 'SOLUTION_HIDDEN')
export const numberContextKeys = stringLiterals('USER_ACCURACY', 'OVERALL_USER_ACCURACY')
export const editingModeContextKeys = stringLiterals('EDITING_MODE')
export const playModeContextKeys = stringLiterals('PLAY_MODE')
export const contextKeys = booleanContextKeys.concat(numberContextKeys as any).concat(editingModeContextKeys as any).concat(playModeContextKeys as any)

export type BooleanTransientKeys = ElementType<typeof booleanContextKeys>
export type NumberTransientKeys = ElementType<typeof numberContextKeys>
export type EditingModeTransientKeys = ElementType<typeof editingModeContextKeys>
export type PlayModeTransientKeys = ElementType<typeof playModeContextKeys>
export type TransientKeys = BooleanTransientKeys | NumberTransientKeys | EditingModeTransientKeys | PlayModeTransientKeys

export type Keys =
    TransientKeys
    | SettingsKeys

export type PlayMode = 'STANDARD' | 'EXPLANATION' | 'LESSON_OVER'
export type EditMode = 'LESSON' | 'METADATA' | 'EXPLAINATION'

type Page = { page: any, pageId: string }


export interface Context extends Settings {
    L: LangPack
    availableLangs: string[]
    UP: UserProgress
    getLessonBuilder(): LessonBuilder
    setLessonBuilder(lessonBuilder: LessonBuilder): void
    clearLessonBuilder(): void

    get<T extends BooleanSettingsKeys>(key: T): boolean
    get<T extends StringSettingsKeys>(key: T): string
    get<T extends InputTypeKeys>(key: T): InputType
    get<T extends BooleanTransientKeys>(key: T): boolean
    get<T extends NumberTransientKeys>(key: T): number
    get<T extends EditingModeTransientKeys>(key: T): EditMode
    get<T extends PlayModeTransientKeys>(key: T): PlayMode


    set<T extends BooleanSettingsKeys | BooleanTransientKeys>(key: T, val: boolean): void
    set<T extends StringSettingsKeys>(key: T, val: string): void
    set<T extends InputTypeKeys>(key: T, val: InputType): void
    set<T extends NumberTransientKeys>(key: T, val: number): void
    set<T extends EditingModeTransientKeys>(key: T, val: EditMode): void
    set<T extends PlayModeTransientKeys>(key: T, val: PlayMode): void


    forceUpdate(): void
    getLesson(): Lesson
    setLesson(lesson: Lesson): void
    getCurrentPage(): Page
    setCurrentPage(page: Page): void
    setForceUpdate(forceUpdate: () => void): void
}

export interface GetContextArgs extends GetSettingsArgs {
    langPacks: { [langName: string]: LangPack }
    S: Settings
    UP: UserProgress
    lessonBuilder?: LessonBuilder
    forceUpdate?: () => void
}

export function getContext(opts: GetContextArgs): Context {
    return new BaseContext({
        UP: getUserProgress(),
        forceUpdate: opts.forceUpdate,
        S: getSettings({}),
        langPacks: { english, italian, spanish }
    })
}

class BaseContext implements Context {

    protected lesson?: Lesson
    protected currentPage?: Page

    constructor(
        readonly opts: GetContextArgs,
        readonly UP = opts.UP,
        readonly inputTypes = opts.S.inputTypes,
        protected lessonBuilder: LessonBuilder | undefined = opts.lessonBuilder ?? getLessonBuilder({}),
        protected contextDict = {} as any,
    ) {
    }

    get L() {
        return this.opts.langPacks[this.opts.S.get('APP_LANGUAGE')]
    }

    get availableLangs() {
        return Object.keys(this.opts.langPacks)
    }

    getLessonBuilder(): LessonBuilder {
        return this.lessonBuilder ?? (this.lessonBuilder = getLessonBuilder({}))
    }

    setLessonBuilder(lessonBuilder: LessonBuilder): void {
        this.lessonBuilder = lessonBuilder
        this.forceUpdate()
    }

    clearLessonBuilder(): void {
        this.lessonBuilder = undefined
    }

    set(key: Keys, value: any): void {

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

    setLesson(lesson: Lesson): void {
        this.lesson = lesson
    }

    getLesson() {

        if (!this.lesson) {
            throw 'No Lesson in Context!'
        }

        return this.lesson

    }

    getCurrentPage(): Page {

        if (!this.currentPage) {
            throw 'No currentPage in Context!'
        }

        return this.currentPage
    }

    setCurrentPage(page: Page): void {
        this.currentPage = page
    }

    setForceUpdate(forceUpdate: () => void): void {
        this.opts.forceUpdate = forceUpdate
    }

    forceUpdate = (): void => {
        this.opts?.forceUpdate?.()
    }

}