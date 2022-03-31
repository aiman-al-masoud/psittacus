/**
 * A wrapper around localStorage to manage 
 * saved data about lessons taken by the user in the past.
 */
export default class UserProgress{

    static userProgress(){
        return JSON.parse(localStorage.getItem("user_progress")) ?? { "lesson_scores": {} }
    }

    static lessonScores(){
        return this.userProgress().lesson_scores 
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