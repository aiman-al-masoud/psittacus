// import ClassLoader from "../utilities/ClassLoader";
// import S from "../utilities/Settings";

// export default class SchedulerManager {

//     constructor(category){
//         this.category = category
//     }

//     getTypes() {
//         return Object.keys(schedulers)
//     }

//     getCurrentShcedulerClass(){
//         return schedulers[S.getInstance().get( this.category )] ?? schedulers[this.getTypes()[0]]
//     }

//     /**
//      * 
//      * @returns {string}
//      */
//     getCurrentSchedulersDescription() {
//         return getCurrentShcedulerClass().getDescription()
//     }

//     async reloadCustomSchedulers() {
//         let manySourceCodes = await ClassLoader.sourceCodesByCategory(this.category)

//         for(let s of manySourceCodes){
//             let clazz = await new ClassLoader().fromSourceCode(s.sourceCode)
//             let x = clazz.getType
//             clazz.getType = ()=>{return `${x()} (CUSTOM)` }
//             schedulers[clazz.getType()] = clazz
//         }
//     }

// }