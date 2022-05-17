import React, { Component } from "react";
import SelectSound from "../../../../res/select.mp3"
import { playBase64 } from "../../../model/utilities/Recorder";

/**
 * A rounded, transparent menu button meant to stay in a grid.
 */
export default class MenuButton extends Component{

    /**
     * 
     * @param {{
     * title : string, 
     * onClick : function, 
     * icon : string
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    onClick = ()=>{
        //play select button sound
        playBase64(SelectSound)
        this.props.onClick()
    }

    render(){
        return (<div className="center_container">
                <div>
                    <button onClick={this.onClick } className="transparent_button" title={this.props.title}> <img src={this.props.icon} /> </button>
                    <p>{this.props.title}</p>
                </div>
        </div>)
    }

}