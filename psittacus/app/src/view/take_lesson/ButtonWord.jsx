import React, { Component } from "react";

export default class ButtonWord extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button id={this.props.id} className="word_button" onClick={() => this.props.onClick(this.props.text)}>{this.props.text}</button>
        )
    }

}
