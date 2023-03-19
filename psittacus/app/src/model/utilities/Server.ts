import { getLesson, Lesson } from "../lesson/Lesson"

export interface Server {
    getLessonIndeces(): Promise<string[]>
    downloadLesson(lessonId: string): Promise<Lesson>
}

export function getServer(): Server {
    return new BaseServer()
}

class BaseServer implements Server {


    async getLessonIndeces() {
        let r = await fetch("/get-lesson-indeces")
        return r.json()
    }

    async downloadLesson(lessonId: string) {

        let res = await fetch('/download-lesson',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ "lesson-index": lessonId })
            })

        return getLesson(await res.json())
    }

}