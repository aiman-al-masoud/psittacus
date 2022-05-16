import React, { Component } from "react";
import Lesson from "../../../model/lesson/Lesson.js";
import L from "../../../model/utilities/Language.js";

/**
 * Represents a single Lesson in a LessonsTable. 
 * It needs a lessonId string, and two callbacks: fetchLessonById()
 * to retrieve a Promise<Lesson> somehow, and takeLesson()to
 * open it once it's ready. 
 */
export default class LessonRow extends Component {

    /**
     * @param {{lessonId: string,  
     * takeLesson : (l:Lesson)=>void, 
     * fetchLessonById: (id:string)=>Promise<Lesson> }} props 
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
        this.props.takeLesson(await this.props.fetchLessonById(this.props.lessonId)   ) 
    }

    render(){
        return <tr tabIndex="0" title={L.click_to_open} style={{background: this.state.highlight? "yellow" : "white"  }}  onMouseEnter={ this.toggleHighlight } onMouseLeave={this.toggleHighlight}   onClick={   this.onTakeLesson  }    ><td>{Lesson.parseId(this.props.lessonId).author}</td><td>{Lesson.parseId(this.props.lessonId).target_language}</td><td>{Lesson.parseId(this.props.lessonId).source_language}</td><td>{Lesson.parseId(this.props.lessonId).title}</td> </tr>
    }
}