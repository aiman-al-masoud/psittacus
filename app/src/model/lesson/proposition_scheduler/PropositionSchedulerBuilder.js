import ClassLoader from "../../utilities/ClassLoader"
import Database from "../../utilities/Database"
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

    static getScheduler(oldScores, propositions) {


        try {
            let constr = schedulers[S.getInstance().get(S.PROPOSITION_SCHEDULER)]
            return new constr(oldScores, propositions)
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
        Database.get().customPropositionSchedulers().add({
            classname: ClassLoader.classnameFromSourceCode(sourceCodeString), 
            sourceCode : sourceCodeString
        })
    }

    static removeCustomScheduler(classname) {
        Database.get().customPropositionSchedulers().delete(classname)
    }

    static removeAllCustomSchedulers() {
        Database.get().customPropositionSchedulers().clear()
    }

    static async loadCustomSchedulers() {
        let manySourceCodes = await Database.get().customPropositionSchedulers().toArray()

        for(let s of manySourceCodes){
            let clazz = await new ClassLoader().fromSourceCode(s.sourceCode)
            console.log(clazz)
            schedulers[clazz.getType()] = clazz
        }

    }

}

// PropositionSchedulerBuilder.removeAllCustomSchedulers()
// PropositionSchedulerBuilder.addCustomScheduler("class Gatto{  constructor(){}; miagola(){console.log('miao!')};  }")
PropositionSchedulerBuilder.loadCustomSchedulers() 




