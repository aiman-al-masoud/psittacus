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

            <div style={{overflowY:"scroll", height:"200px"}}>
            <table className="table">
                <tr><th>author</th><th>target language</th><th>source language</th><th>title</th></tr>
                <tbody  >
                    {this.props.lessonIds.map(id => <LessonRow lessonId={id} key={id} takeLesson={this.props.takeLesson} />)}
                </tbody>
            </table>
            </div>

            <h2>Filters</h2>

            Target Language:
            <input type="text" name="" id="" />
            Source Language:
            <input type="text" name="" id="" />
            <br />
            Author:
            <input type="text" name="" id="" />
            Title:
            <input type="text" name="" id="" />
            <br />

        </div>)
    }


}