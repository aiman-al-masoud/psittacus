import Database from "./Database";
// import S from "./Settings";

/**
 * Provides facilities for loading and storing custom code.
 */
export default class ClassLoader{

    static PermissionDeniedError = "PermissionDeniedError: running custom code disabled!"

    /**
     * Dynamically loads a class from its source code 
     * and returns it.
     * @param {string} sourceCodeString 
     * @returns {Promise <object> }
     */
    async fromSourceCode(sourceCodeString){

        if(!S.getInstance().get(S.DEV_OPTIONS_ENABLED)){
            throw ClassLoader.PermissionDeniedError
        }

        let script = document.createElement('script');
        script.innerHTML = sourceCodeString
        document.body.append(script)
        let classname = ClassLoader.classnameFromSourceCode(sourceCodeString)
        return eval(classname)
    }

    /**
     * 
     * @param {string} category 
     * @param {string} sourceCodeString 
     */
    static storeCustomCode = async (category, sourceCodeString)=>{

        if(!S.getInstance().get(S.DEV_OPTIONS_ENABLED)){
            throw ClassLoader.PermissionDeniedError
        }
        
        Database.get().customSourceCode().add({
            classname: ClassLoader.classnameFromSourceCode(sourceCodeString), 
            category : category,
            sourceCode : sourceCodeString
        })
    }

    /**
     * Delete all custom code and unload it 
     * from the window by reloading.
     */
    static removeAllCustomCode = async ()=>{
        await Database.get().customSourceCode().clear()
        window.location.reload()
    }

    /**
     * Extracts the name of a class from its source code.
     * @param {string} sourceCodeString 
     * @returns {string}
     */
    static classnameFromSourceCode(sourceCodeString){
        return sourceCodeString.match(/class\s+(.*?){/)[1]
    }

    /**
     * 
     * @param {string} category 
     */
    static async sourceCodesByCategory(category){
        return Database.get().customSourceCode().where("category").equals(category).toArray()
    }

   


}