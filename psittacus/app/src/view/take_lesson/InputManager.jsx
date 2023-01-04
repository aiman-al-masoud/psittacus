import React, { Component } from "react";
import TextInput from "./TextInput.jsx";
import ButtonInput from "./ButtonInput.jsx";

export default class InputManager extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.proposition.wordButtons) {
            return <ButtonInput userInput={this.props.userInput} proposition={this.props.proposition} />
        } else {
            return <TextInput userInput={this.props.userInput} />
        }
    }

}
