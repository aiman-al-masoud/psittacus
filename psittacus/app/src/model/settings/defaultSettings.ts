import WorstLessonFirst from "../schedulers/lesson_scheduler/classes/WorstLessonFirst";
import WorstFirst from "../schedulers/proposition_scheduler/classes/WorstFirst";
import { SettingsKeys } from "./Keys";

//@ts-ignore
export const packageJson = require.context("../../../..", false, /package.json$/).keys().map(require.context("../../../..", false, /package.json$/))[0]


export const defaultSettings: { [k in SettingsKeys]: any } = {

    PSITTACUS_VERSION: packageJson.version,
    APP_LANGUAGE: 'English',
    INPUT_TYPE: 'LESSON_DEFAULT',
    DEV_OPTIONS_ENABLED: false,
    PROPOSITION_SCHEDULER: WorstFirst.getType(),
    LESSON_SCHEDULER: WorstLessonFirst.getType(),

}