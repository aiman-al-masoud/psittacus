import React, { Component } from "react";

export default class ButtonWord extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let id = this.props.id;
        let style = {};
        if(this.props.isHidden){
            id = id + '_hidden';
            style = {'display': 'none'}
        }

        return (
            <button id={id} className="word_button" style={style}>{this.props.text}</button>
        )
    }

}
