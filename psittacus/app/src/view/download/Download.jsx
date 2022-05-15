import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import L from "../../model/utilities/Language.js";
import LessonsTable from "../recycled/lessons_table/LessonsTable.jsx"
import Server from "../../model/utilities/Server.js";


export default class Download extends Component{


    /**
     * 
     * @param {{takeLesson:function}} props 
     */
    constructor(props){
        super(props)

        this.state = {
            fetchLessonIds : (()=>[])
        }
    }

    render(){
        return (<div>
            <h1>{L.download_lessons}</h1>
            <span className="text_tip">{L.here_you_can_search_for_and_download}</span>
            <br />
            <br />
            <LessonsTable takeLesson={this.props.takeLesson} fetchLessonIds={this.state.fetchLessonIds} fetchLessonById={Server.getInstance().downloadLesson} />
        </div>)
    }

    componentDidMount(){
        this.fetchIdsTask  = setInterval(() => {
            Server.getInstance().getLessonIndeces().then(ids=>{
                this.setState(  {fetchLessonIds : ((metadataFilter)=>{return ids.filter(id=>Lesson.isMetadataMatching(id, metadataFilter)  )   })  }  )
            })
        }, 2000);
    }

    componentWillUnmount(){
        clearInterval(this.fetchIdsTask)
    }


}