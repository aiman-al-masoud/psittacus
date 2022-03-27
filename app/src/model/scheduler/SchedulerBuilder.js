import Leitner from "./Leitner"
import DuoStyle from "./DuoStyle"
import Settings from "../Settings"

/**
 * Manage's Scheduler's polymorphism.
 */
export default class SchedulerBuilder{

    static types = ["LEITNER", "DUO-STYLE"]

    static getScheduler(lessonJson){        
        switch(Settings.get(Settings.SCHEDULER).toUpperCase()){
            case "LEITNER":
                return new Leitner(lessonJson)
            default:
                return new DuoStyle(lessonJson)
        }
    }



}