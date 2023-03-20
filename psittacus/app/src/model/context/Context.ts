import { getSettings, Settings } from "../settings/Settings"
import { getUserProgress, UserProgress } from "../utilities/UserProgress"
import { LangPack } from "../../../res/lang_packs/LangPack"
import { english } from "../../../res/lang_packs/english"
import { italian } from "../../../res/lang_packs/italian"
import { spanish } from "../../../res/lang_packs/spanish"
import { LessonBuilder } from "../lesson/builder/LessonBuilder"
import { Lesson } from "../lesson/Lesson"
import { Icons } from "../../../res/icons/Icons"
import { Server } from "../utilities/Server"
import { PropoSchedulerFactory } from "../schedulers/proposition_scheduler/PropoSchedulerFactory"
import { LessonSchedulerFactory } from "../schedulers/lesson_scheduler/LessonSchedulerFactory"
import { Database } from "../utilities/Database"
import { Sounds } from '../../../res/sounds/Sounds'
import { BooleanTransientKeys, NumberTransientKeys, EditingModeTransientKeys, EditMode, PlayModeTransientKeys, PlayMode, BooleanSettingsKeys, InputType, InputTypeKeys, StringSettingsKeys, Page } from "../settings/Keys"
import { BaseContext } from "./BaseContext"
import { UrlTracker } from "../utilities/UrlTracker"


export interface Context extends Settings {

    get<T extends BooleanSettingsKeys>(key: T): boolean
    get<T extends StringSettingsKeys>(key: T): string
    get<T extends InputTypeKeys>(key: T): InputType
    get<T extends BooleanTransientKeys>(key: T): boolean
    get<T extends NumberTransientKeys>(key: T): number
    get<T extends EditingModeTransientKeys>(key: T): EditMode
    get<T extends PlayModeTransientKeys>(key: T): PlayMode
    get(key: 'LESSON'): Lesson

    set<T extends BooleanSettingsKeys | BooleanTransientKeys>(key: T, val: boolean): void
    set<T extends StringSettingsKeys>(key: T, val: string): void
    set<T extends InputTypeKeys>(key: T, val: InputType): void
    set<T extends NumberTransientKeys>(key: T, val: number): void
    set<T extends EditingModeTransientKeys>(key: T, val: EditMode): void
    set<T extends PlayModeTransientKeys>(key: T, val: PlayMode): void
    set(key: 'LESSON', value: Lesson): void

    forceUpdate(): void
    setForceUpdate(forceUpdate: () => void): void
    getPage(): Page
    setPage(page: Page): void
    getLessonBuilder(): LessonBuilder
    setLessonBuilder(lessonBuilder: LessonBuilder): void
    clearLessonBuilder(): void

    readonly L: LangPack
    readonly availableLangs: string[]
    readonly UP: UserProgress
    readonly icons: Icons
    readonly sounds: Sounds
    readonly urlTracker: UrlTracker
    readonly server: Server
    readonly propoSchedFac: PropoSchedulerFactory
    readonly lessonSchedFac: LessonSchedulerFactory
    readonly db: Database
}

export interface GetContextArgs {
    langPacks: { [langName: string]: LangPack }
    S: Settings
    UP: UserProgress
    lessonBuilder?: LessonBuilder
    forceUpdate?: () => void
}

export function getContext(opts: GetContextArgs): Context {
    return new BaseContext({
        UP: getUserProgress(),
        S: getSettings({}),
        langPacks: { english, italian, spanish },
        forceUpdate: opts.forceUpdate,
    })
}