import React, { Component } from "react";
import { Context } from "../../../model/context/Context.js";
import { Lesson } from "../../../model/lesson/Lesson.js";
import LessonRow from "./LessonRow";
import { Metadata } from "../../../model/formats/Metadata.js";


type Props = {
    c: Context,
    takeLesson: (l: Lesson) => void,
    fetchLessonIds: (metadata: Metadata) => string[],
    fetchLessonById: (id: string) => Promise<Lesson>
}

type State = { metadata: Metadata }

export default class LessonsTable extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            metadata: {} as Metadata
        }
    }

    onUpdateFilter = (field: any, newVal: any) => {
        this.setState({ metadata: { ...this.state.metadata, [field]: newVal } })
    }

    render() {
        return (<div>


            <table className="table" style={{ width: "70vw", height: "3vh" }}>
                <tr><th>{this.props.c.L.author}</th><th>{this.props.c.L.target_language}</th><th>{this.props.c.L.source_language}</th><th>{this.props.c.L.title}</th></tr>
            </table>

            <div style={{ overflowY: "scroll", height: "200px", width: "70vw" }}>

                <table className="table" style={{ width: "70vw" }}>
                    <tbody>
                        {this.props.fetchLessonIds(this.state.metadata).map(id => <LessonRow c={this.props.c} lessonId={id} key={id} takeLesson={this.props.takeLesson} fetchLessonById={this.props.fetchLessonById} />)}
                    </tbody>
                </table>
            </div>

            <h2>{this.props.c.L.filters}</h2>

            {this.props.c.L.target_language}:
            <input type="text" onInput={(e) => { this.onUpdateFilter("target_language", (e.target as HTMLInputElement).value) }} />
            {this.props.c.L.source_language}:
            <input type="text" onInput={(e) => { this.onUpdateFilter("source_language", (e.target as HTMLInputElement).value) }} />
            <br />
            {this.props.c.L.author}:
            <input type="text" onInput={(e) => { this.onUpdateFilter("author", (e.target as HTMLInputElement).value) }} />
            {this.props.c.L.title}:
            <input type="text" onInput={(e) => { this.onUpdateFilter("title", (e.target as HTMLInputElement).value) }} />
            <br />

        </div>)
    }


}