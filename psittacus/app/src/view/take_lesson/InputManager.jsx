import React, { Component } from "react";
import TextInput from "./TextInput.jsx";
import ButtonInput from "./ButtonInput.jsx";
import S from "../../model/utilities/Settings.js";

export default class InputManager extends Component {

    constructor(props) {
        super(props)
    }

    chooseInput = (inputType) => {
        switch (inputType) {
            case S.ALWAYS_BUTTONS:
                return <ButtonInput userInput={this.props.userInput} proposition={this.props.proposition} />
            case S.ALWAYS_KEYBOARD:
                return <TextInput userInput={this.props.userInput} />
            case S.LESSON_DEFAULT:
                return this.props.proposition.wordButtons ?
                    this.chooseInput(S.ALWAYS_BUTTONS) :
                    this.chooseInput(S.ALWAYS_KEYBOARD)
        }
    }

    render() {
        const inputType = S.getInstance().get(S.INPUT_TYPE)
        return this.chooseInput(inputType)
    }

}
