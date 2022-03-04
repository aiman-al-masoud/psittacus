import React, { Component } from "react";
import L from "../../model/language.js";


export default class Settings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentLang : L.current()
        }
    }

    onChooseLang  = (choice)=>{
        L.set(choice)
        this.setState({currentLang : L.current()})
    }

    render() {

        return (<div>

            <h1>{L.choose_lang}</h1>
            <select value={ this.state.currentLang  }>
                {L.available().map((opt)=>{return <Option value={opt}  onChoose={this.onChooseLang}  />  })}
            </select>

        </div>)
    }

}


/**
 * Option element that calls back select whenever it is clicked.
 */
class Option extends Component {
    
    constructor(props) {
        super(props)
    }

    render(){
        return <option onClick={()=>{this.props.onChoose(this.props.value)}}   >{this.props.value}</option>
    }

}