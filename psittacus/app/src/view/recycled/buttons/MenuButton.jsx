import React, { Component } from "react";
import SelectSound from "../../../../res/select.mp3"
import { playBase64 } from "../../../model/utilities/Recorder";

/**
 * A rounded, transparent menu button.
 */
export default class MenuButton extends Component{

    /**
     * 
     * @param {{
     * title : string, 
     * onClick : function, 
     * icon : string,
     * style : *,
     * highlight : boolean,
     * flippedX : boolean
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
        const isFeatherIcon = !this.props.icon.startsWith('data:')
        if( isFeatherIcon ) {
            return  <button onClick={this.onClick } className="transparent_button icon_button" title={this.props.title}   style={   { ...this.props.style,  background :   this.props.highlight? "red" : "transparent", transform: this.props.flippedX? "scaleX(-1)" : "scale(1)"   }   }> <i data-feather={this.props.icon}></i></button>
        } else {
            return  <button onClick={this.onClick } className="transparent_button" title={this.props.title}   style={   { ...this.props.style,  background :   this.props.highlight? "red" : "transparent", transform: this.props.flippedX? "scaleX(-1)" : "scale(1)"   }   }         > <img src={this.props.icon} /> </button>
        }
    }

}