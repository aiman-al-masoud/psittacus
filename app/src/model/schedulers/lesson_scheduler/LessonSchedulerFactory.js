import S from "../../utilities/Settings"
import LessonScheduler from "./LessonScheduler"
import ClassLoader from "../../utilities/ClassLoader"
const schedulers = Object.fromEntries(require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/)).map(s => { return [s.default.getType(), s.default] }))


export default class LessonSchedulerFactory {

    static CATEGORY_CUSTOM_CODE = "LessonScheduler"

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

    static addCustomScheduler(sourceCodeString) {
        ClassLoader.storeCustomCode(LessonSchedulerFactory.CATEGORY_CUSTOM_CODE, sourceCodeString)
    }

    static async reloadCustomSchedulers() {
        let manySourceCodes = await ClassLoader.sourceCodesByCategory(LessonSchedulerFactory.CATEGORY_CUSTOM_CODE)

        for(let s of manySourceCodes){
            let clazz = await new ClassLoader().fromSourceCode(s.sourceCode)
            let x = clazz.getType
            clazz.getType = ()=>{return `${x()} (CUSTOM)` }
            schedulers[clazz.getType()] = clazz
        }
    }


}

LessonSchedulerFactory.reloadCustomSchedulers()

