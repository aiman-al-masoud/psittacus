import React, { Component } from "react";

export default class ButtonWord extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let style = {};
        if(this.props.isHidden){
            style = {'display': 'none'}
        }

        return (
            <button id={this.props.id} className="word_button" style={style} onClick={this.props.onClick}>{this.props.text}</button>
        )
    }

}
