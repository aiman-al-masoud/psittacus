const langNames = require.context("../../res/lang_packs", false, /.json$/).keys().map((key)=>{return key.replace("./","").replace(".json", "")  })
const langPacks = require.context("../../res/lang_packs", false, /.json$/).keys().map(require.context("../../res/lang_packs", false, /.json$/))
var langs = {}
langNames.forEach( (obj, i)=>{langs[obj] = langPacks[i]})


/**
 * Manages the app's (interface) language. 
 * Has nothing to do with the rest of the model!
 */
export default class Language{

    static set(langName){
        localStorage.setItem("langPack", langName)
        Object.entries(langs[langName]).forEach((entry, i)=>{Language[entry[0]] = entry[1]  })
    }

    static available(){
        return langNames
    }

}

Language.set(localStorage.getItem("langPack")??"english")



