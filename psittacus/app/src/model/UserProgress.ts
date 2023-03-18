//@ts-ignore
import Database from "./utilities/Database";

interface UserProgressData {
    [lessonId: string]: LessonProgressData
}

const root1 = 'user_progress'
const root2 = 'lesson_scores'

interface LessonProgressData {
    lessonId: string
    last_taken: number,
    overall: number,
    propositions: [string, number][]
}

export interface UserProgress {
    userProgress(): { 'lesson_scores': UserProgressData }
    lessonScores(): LessonProgressData[]
    scoresForLesson(lessonId: string): LessonProgressData
    saveLessonScore(lessonId: string, data: LessonProgressData): void
    importProgress(data: LessonProgressData): void
    eraseProgress(): Promise<void>
}

export function getUserProgress(): UserProgress {
    return new BaseUserProgress()
}

class BaseUserProgress implements UserProgress {

    userProgress(): { 'lesson_scores': UserProgressData } {
        return JSON.parse(localStorage.getItem(root1) ?? `{ "${root2}": {} }`)
    }

    lessonScores() {
        return Object.entries(this.userProgress().lesson_scores).map(e => ({ ...e[1], lessonId: e[0] }))
    }

    scoresForLesson(lessonId: string): LessonProgressData {
        return this.userProgress().lesson_scores[lessonId]
    }

    saveLessonScore(lessonId: string, data: LessonProgressData): void { //maybe promise?
        const all = this.userProgress()
        all.lesson_scores[lessonId] = data
        localStorage.setItem(root1, JSON.stringify(all))
    }

    importProgress(data: LessonProgressData): void { //maybe promise?
        localStorage.setItem(root1, JSON.stringify(data))
    }

    eraseProgress(): Promise<void> {
        localStorage.setItem(root1, JSON.stringify({ [root2]: {} }))
        return Database.get().cachedLessons().clear()
    }

}

