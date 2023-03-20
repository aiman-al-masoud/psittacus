import WorstLessonFirst from "../schedulers/lesson_scheduler/classes/WorstLessonFirst";
import WorstFirst from "../schedulers/proposition_scheduler/classes/WorstFirst";
import { SettingsKeys } from "./Settings";

export const defaultSettings: { [k in SettingsKeys]: any } = {

    INPUT_TYPE: 'LESSON_DEFAULT',
    DEV_OPTIONS_ENABLED: false,
    PROPOSITION_SCHEDULER: WorstFirst.getType(),
    APP_LANGUAGE: 'english',
    LESSON_SCHEDULER: WorstLessonFirst.getType(),

}