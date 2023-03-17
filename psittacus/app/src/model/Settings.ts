export function stringLiterals<T extends string>(...args: T[]): T[] { return args; }
export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export interface GetSettingsArgs {
    // inputTypes: InputType[]
}

export function getSettings(args: GetSettingsArgs): Settings {
    return new BaseSettings(args)
}

type SettingsKeys =
    'PROPOSITION_SCHEDULER'
    | 'LESSON_SCHEDULER'
    | 'APP_LANGUAGE'
    | 'DEV_OPTIONS_ENABLED'
    | 'INPUT_TYPE'

const inputTypes1 = stringLiterals('ALWAYS_KEYBOARD', 'ALWAYS_BUTTONS', 'LESSON_DEFAULT')
type InputType = ElementType<typeof inputTypes1>

export interface Settings {
    get(key: SettingsKeys): string | boolean | number
    set(key: SettingsKeys, val: string | boolean | number): void
    readonly inputTypes: InputType[]
}

class BaseSettings implements Settings {

    constructor(
        readonly args: GetSettingsArgs,
        readonly root = 'SETTINGS',
        readonly inputTypes = inputTypes1 /* args.inputTypes */,
        protected readonly settingsDict = JSON.parse(localStorage.getItem(root) ?? '{"INPUT_TYPE" :  "LESSON_DEFAULT"}')//TODO!
    ) {
    }

    get(key: SettingsKeys): string | number | boolean {
        return this.settingsDict[key]
    }

    set(key: SettingsKeys, val: string | number | boolean): void {
        this.settingsDict[key] = val
        localStorage.setItem(this.root, JSON.stringify(this.settingsDict))
    }

}