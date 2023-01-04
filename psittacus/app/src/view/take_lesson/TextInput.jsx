import React, { Component } from "react";


export default class TextInput extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <input ref={this.props.userInput} type="text" className="normal_textbox" />
        )
    }

}
