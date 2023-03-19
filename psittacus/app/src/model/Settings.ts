import { stringLiterals, ElementType } from "./stringLiterals";

export interface GetSettingsArgs {

}

export interface Settings {
    get<T extends string | boolean | number>(key: SettingsKeys): T
    set(key: SettingsKeys, val: string | boolean | number): void
    readonly inputTypes: InputType[]
}

export function getSettings(args: GetSettingsArgs): Settings {
    return new BaseSettings(args)
}

export const settingsKeys = stringLiterals(
    'PROPOSITION_SCHEDULER',
    'LESSON_SCHEDULER',
    'APP_LANGUAGE',
    'DEV_OPTIONS_ENABLED',
    'INPUT_TYPE'
)

const inputTypes1 = stringLiterals(
    'ALWAYS_KEYBOARD',
    'ALWAYS_BUTTONS',
    'LESSON_DEFAULT'
)

export type SettingsKeys = ElementType<typeof settingsKeys>
type InputType = ElementType<typeof inputTypes1>


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