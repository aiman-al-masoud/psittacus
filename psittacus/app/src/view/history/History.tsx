import React, { Component } from "react";
import { Context } from "../../model/Context.js";
import { getLessonIdsHistory, getCachedLessonById, Lesson } from "../../model/lesson/Lesson";
import { Metadata } from "../../model/lesson/LessonBuilder.js";

//@ts-ignore
import LessonSchedulerFactory from "../../model/schedulers/lesson_scheduler/LessonSchedulerFactory.js";
//@ts-ignore
import LessonsTable from "../recycled/lessons_table/LessonsTable.jsx"

export default class History extends Component<{ c: Context, takeLesson: (lesson: any) => void }> {

    readonly lessonScheduler = LessonSchedulerFactory.getScheduler()

    onReviseNext = async () => {
        let lesson = await this.lessonScheduler.next() as Lesson

        if (lesson) {
            lesson.setScheduler(this.props.c)
            this.props.c.set('LESSON', lesson)
            this.props.takeLesson(lesson)
        }
    }

    render() {
        return (<div>

            <h1>{this.props.c.L.revise_with_lesson_scheduler}</h1>
            <div className="text_tip">{this.props.c.L.revise_with_lesson_scheduler_is}</div>

            <button onClick={this.onReviseNext} className="normal_button" >{this.props.c.L.revise} </button>

            <h1>{this.props.c.L.lessons_history}</h1>
            <div className="text_tip">{this.props.c.L.history_here}</div>

            <LessonsTable takeLesson={this.props.takeLesson} fetchLessonIds={(x: Metadata) => getLessonIdsHistory(this.props.c, x)} fetchLessonById={getCachedLessonById} />

        </div>)
    }

}
