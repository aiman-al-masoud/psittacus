import React, { Component } from "react";
import TextInput from "./TextInput.jsx";

export default class InputManager extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.wordButtons) {
            console.log('Use word buttons');
            return <TextInput userInput={this.props.userInput} />
        } else {
            console.log('Dont use word buttons');
            return <TextInput userInput={this.props.userInput} />
        }
    }

}
