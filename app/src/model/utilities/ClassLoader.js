import S from "./Settings";

export default class ClassLoader{

    static PermissionDeniedError = "PermissionDeniedError"

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
     * Extracts the name of a class from its source code.
     * @param {string} sourceCodeString 
     * @returns {string}
     */
    static classnameFromSourceCode(sourceCodeString){
        return sourceCodeString.match(/class\s+(.*?){/)[1]
    }


}