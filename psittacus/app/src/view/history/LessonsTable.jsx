import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import L from "../../model/utilities/Language.js";
import LessonRow from "./LessonRow.jsx";


export default class LessonsTable extends Component {

    /**
     * 
     * @param {{ lessonIds:[string]  }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (<div>

            Author
            <input type="radio" id="author" name="lesson_filter" />
            Source Language
            <input type="radio" id="source language" name="lesson_filter" />
            Target Language
            <input type="radio" id="target language" name="lesson_filter" />
            Title
            <input type="radio" id="title" name="lesson_filter" />


            <input type="text" name="" id="" />  <button className="normal_button">Search</button>

            <table className="table">
                {/* <thead> */}
                    <tr><th>author</th><th>target language</th><th>source language</th><th>title</th></tr>
                {/* </thead> */}
                <tbody  >
                    {this.props.lessonIds.map(id => <LessonRow lessonId={id} key={id} takeLesson={this.props.takeLesson} />)}
                </tbody>
            </table>

            {/* <div style={{ overflowY: "scroll", height: "100px" }}>
                <table className="table">
                   
                </table>
            </div> */}


        </div>)
    }


}