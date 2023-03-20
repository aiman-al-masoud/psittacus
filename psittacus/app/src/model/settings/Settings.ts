import { BaseSettings } from "./BaseSettings";
import { BooleanSettingsKeys, StringSettingsKeys, InputTypeKeys, InputType } from "./Keys";

export interface Settings {

    get<T extends BooleanSettingsKeys>(key: T): boolean
    get<T extends StringSettingsKeys>(key: T): string
    get<T extends InputTypeKeys>(key: T): InputType

    set<T extends BooleanSettingsKeys>(key: T, val: boolean): void
    set<T extends StringSettingsKeys>(key: T, val: string): void
    set<T extends InputTypeKeys>(key: T, val: InputType): void

    readonly inputTypes: InputType[]
}

export function getSettings(args: {}): Settings {
    return new BaseSettings(args)
}

export interface GetSettingsArgs {

}