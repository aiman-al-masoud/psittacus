const langNames = require.context("../../res/lang_packs", false, /.json$/).keys().map((key)=>{return key.replace("./","").replace(".json", "")  })
const langPacks = require.context("../../res/lang_packs", false, /.json$/).keys().map(require.context("../../res/lang_packs", false, /.json$/))
var langs = {}
langNames.forEach( (obj, i)=>{langs[obj] = langPacks[i]})


/**
 * Manages the app's (interface) language. 
 * Has nothing to do with the rest of the model!
 */
export default class Language{

    // static lang = localStorage.getItem("langPack")

    static set(langPack){
        localStorage.setItem("langPack", langPack)
    }

    static get(){
        let i = localStorage.getItem("langPack")
    }

    static available(){
        return langNames
    }


}


