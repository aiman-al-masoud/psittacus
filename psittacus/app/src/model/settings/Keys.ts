import { stringLiterals, ElementType } from "../utilities/stringLiterals";


export const inputTypes = stringLiterals(
    'ALWAYS_KEYBOARD',
    'ALWAYS_BUTTONS',
    'LESSON_DEFAULT'
)

export const booleanSettingKeys = stringLiterals('DEV_OPTIONS_ENABLED')

export const stringSettingKeys = stringLiterals(
    'PROPOSITION_SCHEDULER',
    'APP_LANGUAGE',
    'LESSON_SCHEDULER'
)
export const inputTypeSettingKeys = stringLiterals('INPUT_TYPE')
export const settingsKeys = booleanSettingKeys.concat(stringSettingKeys as any).concat(inputTypeSettingKeys as any)

export const booleanContextKeys = stringLiterals(
    'RECORDING',
    'SOLUTION_HIDDEN'
)
export const numberContextKeys = stringLiterals(
    'USER_ACCURACY',
    'OVERALL_USER_ACCURACY'
)
export const editingModeContextKeys = stringLiterals('EDITING_MODE')
export const playModeContextKeys = stringLiterals('PLAY_MODE')
// export const contextKeys = booleanContextKeys.concat(numberContextKeys as any).concat(editingModeContextKeys as any).concat(playModeContextKeys as any)

export const sensitivePages = stringLiterals(
    'craft-new-lesson',
    'edit-lesson'
)
const normalPages = stringLiterals(
    'open-lesson',
    'info',
    'menu',
    'settings',
    'history',
    'download',
    'take-lesson'
)

export type Keys = TransientKeys | SettingsKeys | 'LESSON'
export type BooleanTransientKeys = ElementType<typeof booleanContextKeys>;
export type NumberTransientKeys = ElementType<typeof numberContextKeys>;
export type EditingModeTransientKeys = ElementType<typeof editingModeContextKeys>;
export type PlayModeTransientKeys = ElementType<typeof playModeContextKeys>;
export type TransientKeys = BooleanTransientKeys | NumberTransientKeys | EditingModeTransientKeys | PlayModeTransientKeys;
export type BooleanSettingsKeys = ElementType<typeof booleanSettingKeys>
export type StringSettingsKeys = ElementType<typeof stringSettingKeys>
export type InputTypeKeys = ElementType<typeof inputTypeSettingKeys>
export type SettingsKeys = BooleanSettingsKeys | StringSettingsKeys | InputTypeKeys
export type InputType = ElementType<typeof inputTypes>
export type PlayMode = 'STANDARD' | 'EXPLANATION' | 'LESSON_OVER';
export type EditMode = 'LESSON' | 'METADATA' | 'EXPLAINATION'
export type SensitivePages = ElementType<typeof sensitivePages>
export type NormalPages = ElementType<typeof normalPages>
export type Page = SensitivePages | NormalPages
