import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import L from "../../model/utilities/Language.js";

export default class LessonRow extends Component {

    /**
     * 
     * @param {{lessonId: string, takeLesson : function }} props 
     */
    constructor(props){
        super(props)
        this.props = props

        this.state = {
            highlight : false
        }
    }

    toggleHighlight = ()=>{
        this.setState({highlight: !this.state.highlight})
    }

    onTakeLesson = async ()=>{
        this.props.takeLesson(await Lesson.getCachedLessonById(this.props.lessonId)) 
    }

    render(){
        return <tr tabindex="0" title="click to open" style={{background: this.state.highlight? "yellow" : "white"  }}  onMouseEnter={ this.toggleHighlight } onMouseLeave={this.toggleHighlight}   onClick={   this.onTakeLesson  }    ><td>{Lesson.parseId(this.props.lessonId).author}</td><td>{Lesson.parseId(this.props.lessonId).target_language}</td><td>{Lesson.parseId(this.props.lessonId).source_language}</td><td>{Lesson.parseId(this.props.lessonId).title}</td> </tr>
    }
}