
export default class ClassLoader{

    async fromSourceCode(sourceCodeString){

        let script = document.createElement('script');
        script.innerHTML = sourceCodeString
        document.body.append(script)
        let classname = ClassLoader.classnameFromSourceCode(sourceCodeString)
        return eval(classname)
    }

    static classnameFromSourceCode(sourceCodeString){
        return sourceCodeString.match(/class\s+(.*?){/)[1]
    }


}