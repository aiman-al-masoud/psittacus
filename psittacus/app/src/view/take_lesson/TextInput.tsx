import React, { Component } from "react";

export default class TextInput extends Component<{ userInput: any }> {

    render() {
        return (
            <input ref={this.props.userInput} type="text" className="normal_textbox" />
        )
    }

}
