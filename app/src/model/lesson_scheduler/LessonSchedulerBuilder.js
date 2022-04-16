import Settings from "../utilities/Settings"

let schedulers = require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/))
schedulers = schedulers.map(s=> {return [s.default.prototype.constructor.name,  s.default]  })
schedulers = Object.fromEntries(schedulers)


export default class LessonSchedulerBuilder{

    static getScheduler(){        
    
        try{
            return new schedulers[""]()
        }catch{
            return new schedulers[this.getTypes()[0]]()
        }
        
    }

    static getTypes(){
        return Object.keys(schedulers)
    }

}

// let x = LessonSchedulerBuilder.getScheduler()
// console.log(x)
// x.next().then(l=>{console.log(l) })
