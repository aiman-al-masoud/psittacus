import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import L from "../../model/utilities/Language.js";

export default class LessonButton extends Component {

    constructor(props){
        super(props)
        this.metadata = Lesson.parseId(this.props.lessonId )
    }

    onReviseNext = async ()=>{
        this.props.takeLesson(await Lesson.getCachedLessonById(this.props.lessonId))
    }

    render(){
        return (
            <div>
                <button onClick={ this.onReviseNext } key={ this.props.lessonId } className="normal_button">{   `${this.metadata.title}@${this.metadata.author}, ${this.metadata.source_language} -> ${this.metadata.target_language}`   }</button>
            </div>
        )
    }

}