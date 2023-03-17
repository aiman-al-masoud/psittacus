import { english } from "./english"

export type LangPack = {
    [x in keyof typeof english]: string
}