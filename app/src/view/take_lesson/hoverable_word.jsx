import React, { Component } from "react";
import Styles from "../styles";



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
                <span onMouseLeave={this.toggleDefinition}   onMouseEnter={this.toggleDefinition}>{this.props.word} </span>
                <span style={{ ...this.state.hidden? Styles.invisible:Styles.visibleInline, color : "red" }}>{this.props.definition} </span>
            </span>)
    }

    toggleDefinition = () => {
        this.setState({hidden: !this.state.hidden})
    }




}
