import { stringLiterals, ElementType } from "./utilities/stringLiterals";

export interface GetSettingsArgs {

}

export function getSettings(args: GetSettingsArgs): Settings {
    return new BaseSettings(args)
}

const inputTypes1 = stringLiterals(
    'ALWAYS_KEYBOARD',
    'ALWAYS_BUTTONS',
    'LESSON_DEFAULT'
)

export const booleanSettingKeys = stringLiterals('DEV_OPTIONS_ENABLED')
export const stringSettingKeys = stringLiterals('PROPOSITION_SCHEDULER', 'APP_LANGUAGE', 'LESSON_SCHEDULER')
export const inputTypeSettingKeys = stringLiterals('INPUT_TYPE')
export const settingsKeys = booleanSettingKeys.concat(stringSettingKeys as any).concat(inputTypeSettingKeys as any)

export type BooleanSettingsKeys = ElementType<typeof booleanSettingKeys>
export type StringSettingsKeys = ElementType<typeof stringSettingKeys>
export type InputTypeKeys = ElementType<typeof inputTypeSettingKeys>

export type SettingsKeys = BooleanSettingsKeys | StringSettingsKeys | InputTypeKeys
export type InputType = ElementType<typeof inputTypes1>



export interface Settings {

    get<T extends BooleanSettingsKeys>(key: T): boolean
    get<T extends StringSettingsKeys>(key: T): string
    get<T extends InputTypeKeys>(key: T): InputType

    set<T extends BooleanSettingsKeys>(key: T, val: boolean): void
    set<T extends StringSettingsKeys>(key: T, val: string): void
    set<T extends InputTypeKeys>(key: T, val: InputType): void


    readonly inputTypes: InputType[]
}

class BaseSettings implements Settings {

    constructor(
        readonly args: GetSettingsArgs,
        readonly root = 'SETTINGS',
        readonly inputTypes = inputTypes1,
        protected readonly settingsDict = JSON.parse(localStorage.getItem(root) ?? '{"INPUT_TYPE" :  "LESSON_DEFAULT"}')//TODO!
    ) {
    }

    get<T>(key: SettingsKeys): T {
        return this.settingsDict[key]
    }

    set(key: SettingsKeys, val: string | number | boolean): void {
        this.settingsDict[key] = val
        localStorage.setItem(this.root, JSON.stringify(this.settingsDict))
    }
}