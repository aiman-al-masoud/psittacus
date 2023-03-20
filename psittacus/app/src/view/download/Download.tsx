import React, { Component } from "react";
import { Context } from "../../model/context/Context";
import { Lesson } from '../../model/lesson/Lesson'
import LessonsTable from "../recycled/lessons_table/LessonsTable"
import { isMetadataMatching } from "../../model/lesson/functions/isMetadataMatching";

type Props = {
    c: Context
}

type State = {
    fetchLessonIds: (metadataFilter: any) => any[]
}

export default class Download extends Component<Props, State>{

    protected fetchIdsTask: any
    state: Readonly<State> = { fetchLessonIds: () => [] }

    playLesson = (lesson: Lesson) => {
        this.props.c.set('LESSON', lesson)
        this.props.c.setPage('take-lesson')
    }

    render() {
        return (<div>
            <h1>{this.props.c.L.download_lessons}</h1>
            <span className="text_tip">{this.props.c.L.here_you_can_search_for_and_download}</span>
            <br />
            <br />
            <LessonsTable c={this.props.c} takeLesson={this.playLesson} fetchLessonIds={this.state.fetchLessonIds} fetchLessonById={this.props.c.server.downloadLesson} />
        </div>)
    }

    componentDidMount() {

        let task = () => {
            this.props.c.server
                .getLessonIndeces()
                .then((ids: string[]) => {
                    this.setState({
                        fetchLessonIds: (metadataFilter: any) => ids.filter(id => isMetadataMatching(id, metadataFilter))
                    })
                })
        }

        task()
        this.fetchIdsTask = setInterval(task, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.fetchIdsTask)
    }

}