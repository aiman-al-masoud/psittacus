import { defaultSettings } from "./defaultSettings"
import { Settings, GetSettingsArgs } from "./Settings"
import { inputTypes as inputTypez, SettingsKeys } from "./Keys"


export class BaseSettings implements Settings {

    protected readonly settingsDict: { [x: string]: any }
    readonly root = 'SETTINGS'
    readonly inputTypes = inputTypez

    constructor(
        readonly args: GetSettingsArgs,
    ) {
        const old = JSON.parse(localStorage.getItem(this.root) ?? '{}')
        this.settingsDict = old

        if (this.get('PSITTACUS_VERSION') !== defaultSettings.PSITTACUS_VERSION) { // in case of breaking changes
            this.settingsDict = defaultSettings
        } else {
            this.settingsDict = { ...defaultSettings, ...old }
        }

        this.write()
    }

    get<T>(key: SettingsKeys): T {
        return this.settingsDict[key]
    }

    set(key: SettingsKeys, val: string | number | boolean): void {
        this.settingsDict[key] = val
        this.write()
    }

    write(): void {
        localStorage.setItem(this.root, JSON.stringify(this.settingsDict))
    }
}
