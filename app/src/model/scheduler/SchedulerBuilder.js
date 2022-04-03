import Settings from "../utilities/Settings"

let schedulers = require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/))
schedulers = schedulers.map(s=> {return [s.default.prototype.constructor.name,  s.default]  })
schedulers = Object.fromEntries(schedulers)

/**
 * Builds different kinds of Schedulers based on the available
 * implementations in `./classes` and the currently selected 
 * implementation in `Settings`.
 */
export default class SchedulerBuilder{

    static getScheduler(lessonJson){        
    
        try{
            return new schedulers[Settings.get(Settings.SCHEDULER)](lessonJson)
        }catch{
            return new schedulers[this.getTypes()[0]](lessonJson)
        }
        
    }

    static getTypes(){
        return Object.keys(schedulers)
    }

}