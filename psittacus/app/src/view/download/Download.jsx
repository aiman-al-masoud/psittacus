import React, { Component } from "react";
import Lesson from "../../model/lesson/Lesson.js";
import L from "../../model/utilities/Language.js";
import LessonsTable from "../history/LessonsTable.jsx"
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
            <LessonsTable takeLesson={this.props.takeLesson} fetchLessonIds={this.state.fetchLessonIds} fetchLessonById={Server.getInstance().downloadLesson} />
        </div>)
    }

    componentDidMount(){
        this.fetchIdsTask  = setInterval(() => {
            Server.getInstance().getLessonIndeces().then(ids=>{
                this.setState(  {fetchLessonIds : (()=>{return ids})  }  )
            })
        }, 2000);
    }

    componentWillUnmount(){
        clearInterval(this.fetchIdsTask)
    }


}