import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import L from "../../model/utilities/Language.js";
import LessonRow from "./LessonRow.jsx";


export default class LessonsTable extends Component {

    /**
     * 
     * @param {{ takeLesson:function  }} props 
     */
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            metadataFilter: {
                author: undefined,
                targetLanguage: undefined,
                sourceLanguage: undefined,
                title: undefined
            }
        }
    }

    onUpdateFilter = (field, newVal) => {

        let m = this.state.metadataFilter
        m[field] = newVal
        this.setState({ metadataFilter: m })
    }

    render() {
        return (<div>

            <table className="table"  style={{width:"70vw", height:"3vh"  }}>
                <tr><th>{L.author}</th><th>{L.target_language}</th><th>{L.source_language}</th><th>{L.title}</th></tr>
            </table>

            <div style={{ overflowY: "scroll", height: "200px", width: "70vw" }}>

                <table className="table" style={{ width: "70vw" }}>
                    <tbody>
                        {Lesson.getLessonIdsHistory(this.state.metadataFilter).map(id => <LessonRow lessonId={id} key={id} takeLesson={this.props.takeLesson} />)}
                    </tbody>
                </table>
            </div>

            <h2>{L.filters}</h2>

            {L.target_language}: 
            <input type="text" onInput={(e) => { this.onUpdateFilter("target_language", e.target.value) }} />
            {L.source_language}: 
            <input type="text" onInput={(e) => { this.onUpdateFilter("source_language", e.target.value) }} />
            <br />
            {L.author}: 
            <input type="text" onInput={(e) => { this.onUpdateFilter("author", e.target.value) }} />
            {L.title}: 
            <input type="text" onInput={(e) => { this.onUpdateFilter("title", e.target.value) }} />
            <br />

        </div>)
    }


}