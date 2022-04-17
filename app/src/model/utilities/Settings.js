/**
 * A wrapper around localStorage, that provides
 * syntactic sugar to set and get global settings params.
 * 
 * Usage:
 * 
 * Settings.set(Settings.TEST, "new value")
 * let val = Settings.get(Settings.TEST)
 * 
 */
export default class Settings{

    static dict = {}

    //Keys:
    static TEST = "TEST"
    static PROPOSITION_SCHEDULER = "PROPOSITION_SCHEDULER"
    static LESSON_SCHEDULER = "LESSON_SCHEDULER"


    /**
     * Define a 'safe' value for each key:
     */
    static default = {
        TEST : "default value for test",
        SCHEDULER : ""
    }

    static set(key, value){
        localStorage.setItem(`SETTING_${key}`, value)
        Settings.dict[key] = value
    }

    static get(key){
        return Settings.dict[key] ?? Settings.default[key]
    }

    /**
     * Load saved values from localStorage (once)
     */
    static init(){
        Object.keys(Settings.default).forEach((key)=>{  Settings.dict[key] = localStorage.getItem(`SETTING_${key}`)   })
    }

}


Settings.init() //call it at least once, somewhere.

