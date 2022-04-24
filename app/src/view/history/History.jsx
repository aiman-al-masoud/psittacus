import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import LessonSchedulerBuilder from "../../model/lesson_scheduler/LessonSchedulerBuilder.js";
import L from "../../model/utilities/Language.js";
import LessonButton from "./LessonButton.jsx";

export default class History extends Component {

    constructor(props) {
        super(props)  
        this.lessonScheduler = LessonSchedulerBuilder.getScheduler()
    }

    onReviseNext = async ()=>{
        let lesson = await this.lessonScheduler.next()
        this.props.takeLesson(lesson)
    }

    render() {
        return (<div>
            <button onClick={this.onReviseNext} className="normal_button" >{  L.revise } </button>

            <h1>{"Lessons History:"}</h1>
            <div>
                {Lesson.getLessonIdsHistory().map(id=>{return <LessonButton lessonId={id} key={id} takeLesson={this.props.takeLesson}/>})}                
            </div>

        </div>)
    }

}
