import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import LessonSchedulerFactory from "../../model/schedulers/lesson_scheduler/LessonSchedulerFactory.js";
import L from "../../model/utilities/Language.js";
import LessonsTable from "../recycled/lessons_table/LessonsTable.jsx"

export default class History extends Component {

    /**
     * 
     * @param {{takeLesson:function}} props 
     */
    constructor(props) {
        super(props)
        this.lessonScheduler = LessonSchedulerFactory.getScheduler()
    }

    onReviseNext = async () => {
        let lesson = await this.lessonScheduler.next()
        console.log(lesson)

        if(lesson){
            console.log(lesson)
            this.props.takeLesson(lesson)
        }
    }

    render() {
        return (<div>

            <h1>{L.revise_with_lesson_scheduler}</h1>
            <div className="text_tip">{L.revise_with_lesson_scheduler_is}</div>

            <button onClick={this.onReviseNext} className="normal_button" >{L.revise} </button>

            <h1>{L.lessons_history}</h1>
            <div className="text_tip">{L.history_here}</div>

            <LessonsTable  takeLesson={this.props.takeLesson}  fetchLessonIds={Lesson.getLessonIdsHistory} fetchLessonById={Lesson.getCachedLessonById} />            

        </div>)
    }

}
