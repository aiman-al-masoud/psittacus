import { arabic } from "./arabic"
import { chinese } from "./chinese"
import { english } from "./english"
import { italian } from "./italian"
import { spanish } from "./spanish"

export type LangPack = {
    [x in keyof typeof english]: string
}

export function getLangPacks() {

    return [english, italian, arabic, spanish, chinese]
        .map(x => ({ [x.language_own_name]: x }))
        .reduce((a, b) => ({ ...a, ...b }))

}