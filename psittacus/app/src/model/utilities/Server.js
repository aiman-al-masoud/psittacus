import Lesson from "../lesson/Lesson"

export default class Server {

    instance = undefined

    /**
     * 
     * @returns {Server}
     */
    static getInstance() {
        return Server.instance = Server.instance ?? new Server()
    }

    /**
     * 
     * @returns {Promise<[string]>}
     */
    async getLessonIndeces() {
        let r = await fetch("/get-lesson-indeces")
        return r.json()
    }

    /**
     * 
     * @param {string} lessonId 
     * @returns  {Promise<Lesson>}
     */
    async downloadLesson(lessonId) {

        let res = await fetch('/download-lesson',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ "lesson-index" : lessonId })
            })

        return new Lesson(await res.json())
    }

}