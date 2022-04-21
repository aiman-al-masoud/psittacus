import Settings from "../../utilities/Settings"

let schedulers = require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/))
schedulers = schedulers.map(s=> {return [s.default.getType(),  s.default]  })
schedulers = Object.fromEntries(schedulers)

/**
 * Builds different kinds of Schedulers based on the available
 * implementations in `./classes` and the currently selected 
 * implementation in `Settings`.
 */
export default class PropositionSchedulerBuilder{

    static getScheduler(oldScores, propositions){        

        console.log("proposchedbuild: these arrrrr shcedulererrrra:::::\n", schedulers)
    
        try{
            console.log("setting:", Settings.get(Settings.PROPOSITION_SCHEDULER))



            let constr = schedulers[Settings.get(Settings.PROPOSITION_SCHEDULER)]
            console.log("proposchedbuid this is constrrririri::::\n", constr)
            return new constr(oldScores, propositions)
        }catch(e){
            console.log("proposchedbuild: errororooooooor!:::\n", e)
            return new schedulers[this.getTypes()[0]](oldScores, propositions)
        }
        
    }

    static getTypes(){
        return Object.keys(schedulers)
    }

}