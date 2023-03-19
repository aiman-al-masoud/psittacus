import React, { Component } from "react";
import { Context } from "../../../model/Context";
import { Lesson, parseId } from "../../../model/lesson/Lesson";

type Props = {
    c: Context,
    lessonId: string,
    /* retrieves lesson 'somehow' */fetchLessonById: (id: string) => Promise<Lesson>,
    /* opens lesson once retrieved */takeLesson: (lesson: Lesson) => void,
}

type State = {
    highlight: boolean
}

export default class LessonRow extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            highlight: false
        }
    }

    toggleHighlight = () => {
        this.setState({ highlight: !this.state.highlight })
    }

    onTakeLesson = async () => {
        this.props.takeLesson(await this.props.fetchLessonById(this.props.lessonId))
    }

    render() {

        const metadata = parseId(this.props.lessonId)

        return <tr tabIndex={0}
            title={this.props.c.L.click_to_open}
            style={{ background: this.state.highlight ? 'yellow' : 'white' }}
            onMouseEnter={this.toggleHighlight}
            onMouseLeave={this.toggleHighlight}
            onClick={this.onTakeLesson}>
            <td>{metadata.author}</td>
            <td>{metadata.target_language}</td>
            <td>{metadata.source_language}</td>
            <td>{metadata.title}</td>
        </tr>
    }
}