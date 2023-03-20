import React, { Component } from "react";
import { Context } from "../../model/context/Context.js";
import { Lesson } from "../../model/lesson/Lesson";
import { getCachedLessonById } from "../../model/lesson/functions/getCachedLessonById";
import LessonsTable from "../recycled/lessons_table/LessonsTable"
import { getLessonIdsHistory } from "../../model/lesson/functions/getLessonIdsHistory";


export default class History extends Component<{ c: Context }> {

    readonly lessonScheduler = this.props.c.lessonSchedFac.get()

    playLesson = (lesson: Lesson) => {
        this.props.c.set('LESSON', lesson)
        this.props.c.setPage('take-lesson')
    }

    onReviseNext = async () => {
        const lesson = await this.lessonScheduler.next() as Lesson

        if (lesson) {
            this.playLesson(lesson)
        }
    }

    render() {
        return (<div>

            <h1>{this.props.c.L.revise_with_lesson_scheduler}</h1>
            <div className="text_tip">{this.props.c.L.revise_with_lesson_scheduler_is}</div>

            <button onClick={this.onReviseNext} className="normal_button" >{this.props.c.L.revise} </button>

            <h1>{this.props.c.L.lessons_history}</h1>
            <div className="text_tip">{this.props.c.L.history_here}</div>

            <LessonsTable
                c={this.props.c}
                takeLesson={this.playLesson}
                fetchLessonIds={x => getLessonIdsHistory(this.props.c, x)}
                fetchLessonById={id => getCachedLessonById(id, this.props.c)} />

        </div>)
    }

}
