import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import LessonSchedulerBuilder from "../../model/schedulers/lesson_scheduler/LessonSchedulerBuilder.js";
import L from "../../model/utilities/Language.js";
import LessonButton from "./LessonButton.jsx";

export default class History extends Component {

    constructor(props) {
        super(props)
        this.lessonScheduler = LessonSchedulerBuilder.getScheduler()
    }

    onReviseNext = async () => {
        let lesson = await this.lessonScheduler.next()
        this.props.takeLesson(lesson)
    }

    render() {
        return (<div>

            <h1>{L.revise_with_lesson_scheduler}</h1>
            <div className="text_tip">{L.revise_with_lesson_scheduler_is}</div>

            <button onClick={this.onReviseNext} className="normal_button" >{L.revise} </button>

            <h1>{L.lessons_history}</h1>
            <div className="text_tip">{L.history_here}</div>

            <div>
                {Lesson.getLessonIdsHistory().map(id => { return <LessonButton lessonId={id} key={id} takeLesson={this.props.takeLesson} /> })}
            </div>

        </div>)
    }

}
