import { getSettings, GetSettingsArgs, Settings } from "./Settings"
import { getUserProgress, UserProgress } from "./UserProgress"
import { LangPack } from "../../res/lang_packs/LangPack"
import { english } from "../../res/lang_packs/english"
import { italian } from "../../res/lang_packs/italian"
import { spanish } from "../../res/lang_packs/spanish"

export interface Context {
    L: LangPack
    S: Settings
    availableLangs: string[]
    UP: UserProgress
}

export interface GetContextArgs extends GetSettingsArgs {
    langPacks: { [langName: string]: LangPack }
    S: Settings
    UP: UserProgress
}

export function getContext(opts: GetContextArgs): Context {
    return new BaseContext({
        UP: getUserProgress(),
        forceUpdate: opts.forceUpdate,
        S: getSettings({ forceUpdate: opts.forceUpdate }),
        langPacks: { english, italian, spanish }
    })
}

class BaseContext implements Context {

    constructor(
        readonly opts: GetContextArgs,
        readonly S = opts.S,
        readonly UP = opts.UP
    ) {
    }

    get L() {
        return this.opts.langPacks[this.S.get<string>('APP_LANGUAGE')]
    }

    get availableLangs() {
        return Object.keys(this.opts.langPacks)
    }

}