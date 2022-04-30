import S from "../../utilities/Settings"
import LessonScheduler from "./LessonScheduler"
const schedulers = Object.fromEntries(require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/)).map(s => { return [s.default.getType(), s.default] }))

export default class LessonSchedulerFactory {

    /**
     * 
     * @returns {LessonScheduler}
     */
    static getScheduler() {

        try {
            return new schedulers[S.getInstance().get(S.LESSON_SCHEDULER)]()
        } catch {
            return new schedulers[this.getTypes()[0]]()
        }

    }

    static getTypes(){
        return Object.keys(schedulers)
    }

    /**
    * @returns {string}
    */
    static getCurrentSchedulersDescription() {
        let clazz = schedulers[S.getInstance().get(S.LESSON_SCHEDULER)] ?? schedulers[this.getTypes()[0]]
        return clazz.getDescription()
    }

}

