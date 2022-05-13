import React, { Component } from "react";
import L from "../../model/utilities/Language.js";
import PropositionSchedulerFactory from "../../model/schedulers/proposition_scheduler/PropositionSchedulerFactory.js";
import UserProgress from "../../model/utilities/UserProgress.js";
import S from "../../model/utilities/Settings.js"
import { readText, saveToComp } from "../../model/utilities/Utils.js";
import LessonSchedulerFactory from "../../model/schedulers/lesson_scheduler/LessonSchedulerFactory.js";
import DeveloperOptions from "./DeveloperOptions.jsx"

export default class Settings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            APP_LANGUAGE: L.current(),
            PROPOSITION_SCHEDULER: S.getInstance().get(S.PROPOSITION_SCHEDULER),
            LESSON_SCHEDULER: S.getInstance().get(S.LESSON_SCHEDULER)
        }
    }
    
    onSet = (key, event) => {

        let choice = event.target
        choice = choice.options[choice.selectedIndex].text
        console.log(key, choice)
        S.getInstance().set(key, choice)
        let newState = {}
        newState[key] = choice
        this.setState(newState)

        if(key==S.APP_LANGUAGE){
            L.reload() //redundant
            window.location.reload()
        }

    }

    importProgress = async () => {
        let d = await readText()
        d = JSON.parse(d)
        UserProgress.importProgress(d)
    }

    exportProgress = () => {
        saveToComp(JSON.stringify(UserProgress.userProgress()), "progress.txt", "text/plain")
    }

    eraseProgress = ()=>{
        confirm("Are you sure?")? UserProgress.eraseProgress() : undefined
    }

    render() {

        return (<div>

            <h1>{L.choose_lang}</h1>
            <select value={this.state.APP_LANGUAGE} onChange={(event) => { this.onSet(S.APP_LANGUAGE, event)  }} >
                {L.available().map((opt, index) => { return <option title={opt} key={index}>{opt}</option> })}
            </select>

            <h1>{L.choose_proposition_scheduler}</h1>
            <div className="text_tip">{L.proposition_scheduler_is}</div>

            <select value={this.state.PROPOSITION_SCHEDULER} onChange={(event) => { this.onSet(S.PROPOSITION_SCHEDULER, event) }} >
                {PropositionSchedulerFactory.getTypes().map((opt, index) => { return <option title={opt} key={index}>{opt}</option> })}
            </select>

            <div className="text_tip"> 
            {PropositionSchedulerFactory.getCurrentSchedulersDescription()} 
            </div>

            <h1>{L.choose_lesson_scheduler}</h1>
            <div className="text_tip">{L.lesson_scheduler_is}</div>

            <select value={this.state.LESSON_SCHEDULER} onChange={(event) => { this.onSet(S.LESSON_SCHEDULER, event) }} >
                {LessonSchedulerFactory.getTypes().map((opt, index) => { return <option title={opt} key={index}>{opt}</option> })}
            </select>

            <div className="text_tip"> 
            {LessonSchedulerFactory.getCurrentSchedulersDescription()} 
            </div>


            <h1>{L.manage_data_about_your_progress}</h1>
            <div className="text_tip">{L.progress_is}</div>

            <button onClick={this.exportProgress} className="normal_button">{L.export_progress}</button>
            <button onClick={this.importProgress} className="normal_button">{L.import_progress}</button>
            <button onClick={this.eraseProgress} className="normal_button">{L.erase_progress}</button>

            <br />
            <br />
            <DeveloperOptions/>

        </div>)
    }

}
