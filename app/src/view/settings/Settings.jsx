import React, { Component } from "react";
import L from "../../model/utilities/Language.js";
import PropositionSchedulerBuilder from "../../model/lesson/proposition_scheduler/PropositionSchedulerBuilder.js";
import UserProgress from "../../model/utilities/UserProgress.js";
import S from "../../model/utilities/Settings.js"
import { readText, saveToComp } from "../../model/utilities/Utils.js";
import LessonSchedulerBuilder from "../../model/lesson_scheduler/LessonSchedulerBuilder.js";

export default class Settings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentLang : L.current(),
            currentScheduler : S.get(S.PROPOSITION_SCHEDULER),
            currentLessonScheduler : S.get(S.LESSON_SCHEDULER)
        }
    }

    onChooseLang  = (event)=>{
        let choice = event.target
        choice = choice.options[choice.selectedIndex].text    
        L.set(choice)
        this.setState({currentLang : L.current()})   
        window.location.reload() //danger, may loose work
    }

    onSet = (key, event)=>{
        let choice = event.target
        choice = choice.options[choice.selectedIndex].text    
        S.set(key, choice)
        this.setState({currentScheduler : choice})   
    }

    importProgress = async ()=>{
        let d =  await readText()
        d = JSON.parse(d)
        UserProgress.importProgress(d)
    }

    exportProgress = ()=>{
        saveToComp(JSON.stringify(UserProgress.userProgress()) , "progress.txt" , "text/plain")
    }


    render() {

        

        return (<div>

            <h1>{L.choose_lang}</h1>
            <select value={this.state.currentLang}  onChange={this.onChooseLang} >
                {L.available().map((opt, index)=>{return <option title={opt} key={index}>{opt}</option>  })}
            </select>

            <h1>{L.choose_proposition_scheduler}</h1>
            <div className="text_tip">{L.proposition_scheduler_is}</div>             

            <select value={ this.state.currentScheduler   }  onChange = { (event)=>{this.onSet( S.PROPOSITION_SCHEDULER, event)} } >
                {PropositionSchedulerBuilder.getTypes().map((opt, index)=>{return <option title={opt} key={index}>{opt}</option>  })}
            </select>      

            <br />

            <h1>{ L.choose_lesson_scheduler }</h1>
            <div className="text_tip">{ L.lesson_scheduler_is }</div>        

            <select value={ this.state.currentLessonScheduler   }  onChange = { (event)=>{this.onSet( S.LESSON_SCHEDULER, event)} } >
                {LessonSchedulerBuilder.getTypes().map((opt, index)=>{return <option title={opt} key={index}>{opt}</option>  })}
            </select>      



            <h1>{L.manage_data_about_your_progress}</h1>
            <div className="text_tip">{L.progress_is}</div>             
            
            <button onClick={this.exportProgress} className="normal_button">{L.export_progress}</button> 
            <button onClick={this.importProgress} className="normal_button">{L.import_progress}</button> 
            <button onClick={UserProgress.eraseProgress} className="normal_button">{L.erase_progress}</button> 


        </div>)
    }

}
