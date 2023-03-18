import React, { Component } from "react";
import { Context } from "../../model/Context.js";

//@ts-ignore
import LessonsTable from "../recycled/lessons_table/LessonsTable.jsx"
//@ts-ignore
import Server from "../../model/utilities/Server.js";
//@ts-ignore
import Lesson from "../../model/lesson/Lesson.js";

type Props = {
    c: Context
    takeLesson: (lesson: any) => void
}

type State = {
    fetchLessonIds: (metadataFilter: any) => any[]
}

export default class Download extends Component<Props, State>{

    protected fetchIdsTask: any
    state: Readonly<State> = { fetchLessonIds: () => [] }

    render() {
        return (<div>
            <h1>{this.props.c.L.download_lessons}</h1>
            <span className="text_tip">{this.props.c.L.here_you_can_search_for_and_download}</span>
            <br />
            <br />
            <LessonsTable takeLesson={this.props.takeLesson} fetchLessonIds={this.state.fetchLessonIds} fetchLessonById={Server.getInstance().downloadLesson} />
        </div>)
    }

    componentDidMount() {

        let task = () => {
            Server.getInstance()
                .getLessonIndeces()
                .then((ids: string[]) => {
                    this.setState({
                        fetchLessonIds: (metadataFilter: any) => ids.filter(id => Lesson.isMetadataMatching(id, metadataFilter))
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