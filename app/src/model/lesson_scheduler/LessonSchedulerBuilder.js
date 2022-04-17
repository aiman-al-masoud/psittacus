import S from "../utilities/Settings"
import LessonScheduler from  "./LessonScheduler"

let schedulers = require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/))
schedulers = schedulers.map(s=> {return [s.default.prototype.constructor.name,  s.default]  })
schedulers = Object.fromEntries(schedulers)


export default class LessonSchedulerBuilder{

    /**
     * 
     * @returns {LessonScheduler}
     */
    static getScheduler(){        
    
        try{
            return new schedulers[ S.get(S.LESSON_SCHEDULER)  ]()
        }catch{
            return new schedulers[this.getTypes()[0]]()
        }
        
    }

    static getTypes(){
        return Object.keys(schedulers)
    }

}

