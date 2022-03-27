import React, { Component } from "react";
import L from "../../model/Language.js";
import SchedulerBuilder from "../../model/scheduler/SchedulerBuilder.js";
import S from "../../model/Settings.js"

export default class Settings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentLang : L.current(),
            currentScheduler : S.get(S.SCHEDULER)
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

    render() {

        return (<div>

            <h1>{L.choose_lang}</h1>
            <select value={this.state.currentLang}  onChange={this.onChooseLang} >
                {L.available().map((opt)=>{return <option title={opt}>{opt}</option>  })}
            </select>

            <h1>{L.choose_scheduler}</h1>
            <div className="text_tip">{L.scheduler_is}</div>             

            <select value={ this.state.currentScheduler   }  onChange = { (event)=>{this.onSet( S.SCHEDULER, event)} } >
                {SchedulerBuilder.types.map((opt)=>{return <option title={opt}>{opt}</option>  })}
            </select>            

        </div>)
    }

}
