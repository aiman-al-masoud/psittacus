import React, { Component } from "react";
import Styles from "../Styles";



export default class HoverableWord extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            hidden : true
        }

    }

    render() {
        
        return (
            <span>
                <span onMouseLeave={this.toggleDefinition}   onMouseEnter={this.toggleDefinition}  style={ {color : this.state.hidden?"black": "red"  , cursor:"default"  } }   >{this.props.word} </span>
                                
                <div  className="hovering_tool_tip" style={{ ...this.state.hidden? Styles.invisible:Styles.visibleInline}}>   <p style={{ textDecoration: "underline"  }} >{this.props.word}</p>   <p>{this.props.definition}</p> </div>

            </span>)
    }

    toggleDefinition = (e) => {
        this.setState({hidden: !this.state.hidden})
    }




}
