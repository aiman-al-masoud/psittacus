/**
 * A wrapper around localStorage to manage 
 * saved data about lessons taken by the user in the past.
 * 
 * Common Interface for accessing saved progress among Schdulers:
 * 
 * 
 * ```json
 * "user_progress" : {
 *
 *   "lesson_scores":{
 *
 *       "lesson_id_0" : {
 *          "last_taken" : 164866215242,
 *           "overall" : 79,
 *          "propositions" : [["propo_hash_0", 80] ...]
 *       }
 *   }
 * 
 * }
 * ```
 * 
 */
export default class UserProgress{

    static userProgress(){
        return JSON.parse(localStorage.getItem("user_progress")) ?? { "lesson_scores": {} }
    }

    static scoresForLesson(lessonId){
        return this.userProgress().lesson_scores[lessonId]
    }

    static async saveLessonScore(lessonId, data){
        let p  = this.userProgress()
        p.lesson_scores[lessonId] = data
        localStorage.setItem("user_progress", JSON.stringify(p))
    }

    static async importProgress(data){
        localStorage.setItem("user_progress", JSON.stringify(data))
    }

    static async eraseProgress(){
        localStorage.setItem("user_progress", JSON.stringify({ "lesson_scores": {} }))
    }

}