import React, { Component } from "react";
import LessonSchedulerBuilder from "../../model/lesson_scheduler/LessonSchedulerBuilder.js";
import L from "../../model/utilities/Language.js";

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
            <button onClick={this.onReviseNext}>{"Revise!"}</button>
        </div>)
    }

}
