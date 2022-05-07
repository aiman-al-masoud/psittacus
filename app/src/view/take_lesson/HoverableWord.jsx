import React, { Component } from "react";
import Styles from "../Styles";
import Tooltip from "./Tooltip.jsx";



export default class HoverableWord extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            hidden : true
        }

    }

    render() {
        
        return (
            <span >
                <span onMouseLeave={this.toggleDefinition}   onMouseEnter={this.toggleDefinition}   onClick={this.toggleDefinition} style={ {color : this.state.hidden?"black": "orange"  , cursor:"default"  } }   >{this.props.word} </span>
                                
                <Tooltip hidden={this.state.hidden}  title={this.props.word}  body={this.props.definition} />

            </span>)
    }

    toggleDefinition = (e) => {
        this.setState({hidden: !this.state.hidden})
    }




}
