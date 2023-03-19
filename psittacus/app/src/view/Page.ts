import { stringLiterals, ElementType } from "../model/utilities/stringLiterals";

export const sensitivePages = stringLiterals('craft-new-lesson', 'edit-lesson')
const normalPages = stringLiterals('open-lesson', 'info', 'menu', 'settings', 'history', 'download', 'take-lesson')
const pages = (sensitivePages as any).concat('')

type SensitivePages = ElementType<typeof sensitivePages>

type NormalPages = ElementType<typeof normalPages>

export type Page = SensitivePages | NormalPages

