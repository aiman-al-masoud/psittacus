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

    
        try{
            let constr = schedulers[Settings.get(Settings.PROPOSITION_SCHEDULER)]
            return new constr(oldScores, propositions)
        }catch(e){
            return new schedulers[this.getTypes()[0]](oldScores, propositions)
        }
        
    }

    static getTypes(){
        return Object.keys(schedulers)
    }

}