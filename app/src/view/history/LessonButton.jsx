import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import L from "../../model/utilities/Language.js";

export default class LessonButton extends Component {

    constructor(props){
        super(props)
    }

    onReviseNext = async ()=>{
        let lesson = await Lesson.getCachedLessonById(this.props.lessonId)
        this.props.takeLesson(lesson)
    }

    render(){
        return (
            <div>
                <button onClick={ this.onReviseNext }>{this.props.lessonId}</button>
            </div>
        )
    }

}