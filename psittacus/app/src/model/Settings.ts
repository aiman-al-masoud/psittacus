export function stringLiterals<T extends string>(...args: T[]): T[] { return args; }
export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export interface GetSettingsArgs {
    forceUpdate: () => void
}

export function getSettings(args: GetSettingsArgs): Settings {
    return new BaseSettings(args)
}

export type SettingsKeys =
    'PROPOSITION_SCHEDULER'
    | 'LESSON_SCHEDULER'
    | 'APP_LANGUAGE'
    | 'DEV_OPTIONS_ENABLED'
    | 'INPUT_TYPE'

const inputTypes1 = stringLiterals('ALWAYS_KEYBOARD', 'ALWAYS_BUTTONS', 'LESSON_DEFAULT')
type InputType = ElementType<typeof inputTypes1>

export interface Settings {
    get<T extends string | boolean | number>(key: SettingsKeys): T
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

    get<T>(key: SettingsKeys): T {
        return this.settingsDict[key]
    }

    set(key: SettingsKeys, val: string | number | boolean): void {
        this.settingsDict[key] = val
        localStorage.setItem(this.root, JSON.stringify(this.settingsDict))
        this.args.forceUpdate()
    }

}