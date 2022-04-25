const langNames = require.context("../../../res/lang_packs", false, /.json$/).keys().map((key)=>{return key.replace("./","").replace(".json", "")  })
const langPacks = require.context("../../../res/lang_packs", false, /.json$/).keys().map(require.context("../../../res/lang_packs", false, /.json$/))
var langs = {}
langNames.forEach( (obj, i)=>{langs[obj] = langPacks[i]})
import S from "./Settings"

/**
 * ### Manages the app's (interface) language. 
 * 
 * ### Usage (JSX):
 * 
 * `<h1>{ L.i_am_a_title }</h1>`
 * 
 * ### Add a Language Pack:
 * 
 * 1) Navigate to `/app/res/lang_packs/` and create a new empty 
 * json file with the name of the language you want to add.
 * 
 * 2) Copy the contents of `english.json` into your new file, and
 * translate each value in the dictionary **(leave the keys unchanged)**.
 * 
 * 
 */
export default class Language{

    static set(langName){
        S.getInstance().set(S.APP_LANGUAGE, langName)
        Language.currentLang = langName
        Object.entries(langs[langName]).forEach((entry, i)=>{Language[entry[0]] = entry[1]  })
    }

    static available(){
        return langNames
    }

    static current(){
        return Language.currentLang
    }

}

// call this once to initialize the lang-pack dictionary:
Language.set( S.getInstance().get( S.APP_LANGUAGE ) ?? "english")



