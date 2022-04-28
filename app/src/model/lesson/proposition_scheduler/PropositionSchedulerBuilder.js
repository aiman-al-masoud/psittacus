import ClassLoader from "../../utilities/ClassLoader"
import S from "../../utilities/Settings"

let schedulers = require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/))
schedulers = schedulers.map(s => { return [s.default.getType(), s.default] })
schedulers = Object.fromEntries(schedulers)

/**
 * Builds different kinds of Schedulers based on the available
 * implementations in `./classes` and the currently selected 
 * implementation in `Settings`.
 */
export default class PropositionSchedulerBuilder {

    static CATEGORY_CUSTOM_CODE = "PropositionScheduler"

    static getScheduler(oldScores, propositions) {

        try {
            return new schedulers[S.getInstance().get(S.PROPOSITION_SCHEDULER)](oldScores, propositions)
        } catch (e) {
            return new schedulers[this.getTypes()[0]](oldScores, propositions)
        }

    }

    static getTypes() {
        return Object.keys(schedulers)
    }

    /**
     * @returns {string}
     */
    static getCurrentSchedulersDescription() {
        let clazz = schedulers[S.getInstance().get(S.PROPOSITION_SCHEDULER)] ?? schedulers[this.getTypes()[0]]
        return clazz.getDescription()
    }

    static addCustomScheduler(sourceCodeString) {
        ClassLoader.storeCustomCode(PropositionSchedulerBuilder.CATEGORY_CUSTOM_CODE, sourceCodeString)
        PropositionSchedulerBuilder.reloadCustomSchedulers()
    }

    static async reloadCustomSchedulers() {
        let manySourceCodes = await ClassLoader.sourceCodesByCategory(PropositionSchedulerBuilder.CATEGORY_CUSTOM_CODE)

        for(let s of manySourceCodes){
            let clazz = await new ClassLoader().fromSourceCode(s.sourceCode)
            schedulers[clazz.getType()] = clazz
        }
    }

}

// at webpage reload:
PropositionSchedulerBuilder.reloadCustomSchedulers() 




