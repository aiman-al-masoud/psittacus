import { getLesson, Lesson } from "../lesson/Lesson"
import { Context } from "../context/Context"

export interface Server {
    getLessonIndeces(): Promise<string[]>
    downloadLesson(lessonId: string): Promise<Lesson>
}

export function getServer(context: Context): Server {
    return new BaseServer(context)
}

class BaseServer implements Server {

    constructor(
        readonly context: Context,
    ) {
    }

    getLessonIndeces = async () => {
        let r = await fetch("/get-lesson-indeces")
        return r.json()
    }

    downloadLesson = async (lessonId: string) => {

        let res = await fetch('/download-lesson',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ "lesson-index": lessonId })
            })

        return getLesson(await res.json(), this.context)
    }

}