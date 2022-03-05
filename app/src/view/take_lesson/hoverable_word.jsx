import React, { Component } from "react";

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
                <span style={{visibility : this.state.hidden?"hidden":"visible", display : this.state.hidden?"none":"inline", color : "red" }}>{this.props.definition} </span>
            </span>)
    }

    toggleDefinition = () => {
        this.setState({hidden: !this.state.hidden})
    }




}
