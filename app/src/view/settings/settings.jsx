import React, { Component } from "react";
import L from "../../model/language.js";


export default class Settings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentLang : L.current()
        }
    }

    onChooseLang  = (event)=>{
        let choice = event.target
        choice = choice.options[choice.selectedIndex].text    
        L.set(choice)
        this.setState({currentLang : L.current()})   
    }

    render() {

        return (<div>

            <h1>{L.choose_lang}</h1>
            <select value={this.state.currentLang}  onChange={this.onChooseLang} >
                {L.available().map((opt)=>{return <option title={opt}>{opt}</option>  })}
            </select>

        </div>)
    }

}
