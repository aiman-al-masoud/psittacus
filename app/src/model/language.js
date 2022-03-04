const langNames = require.context("../../res/lang_packs", false, /.json$/).keys().map((key)=>{return key.replace("./","").replace(".json", "")  })
const langPacks = require.context("../../res/lang_packs", false, /.json$/).keys().map(require.context("../../res/lang_packs", false, /.json$/))
var langs = {}
langNames.forEach( (obj, i)=>{langs[obj] = langPacks[i]})


/**
 * Manages the app's (interface) language. 
 * Has nothing to do with the rest of the model!
 */
export default class Language{

    static lang = localStorage.getItem("langPack")??"english"

    static set(langPack){
        localStorage.setItem("langPack", langPack)
        Language.lang = langPack

   
        
        Object.entries(langs[langPack]).forEach((entry, i)=>{Language[entry[0]] = entry[1]  })


    }

    static get(){
        return langs[Language.lang]
    }

    static available(){
        return langNames
    }

}


