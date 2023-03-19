import React, { Component } from "react";
import { Context } from "../../model/Context.js";
import { InputType } from "../../model/Settings.js";

//@ts-ignore
import TextInput from "./TextInput.jsx";
//@ts-ignore
import ButtonInput from "./ButtonInput.jsx";

export default class InputManager extends Component<{ c: Context, userInput: any }> {

    render() {
        return this.choose(this.props.c.get('INPUT_TYPE'))
    }

    choose = (inputType: InputType): JSX.Element => {
        switch (inputType) {
            case 'ALWAYS_BUTTONS':
                return <ButtonInput userInput={this.props.userInput} proposition={this.props.c.getLesson().getCurrent()} />
            case 'ALWAYS_KEYBOARD':
                return <TextInput userInput={this.props.userInput} />
            case 'LESSON_DEFAULT':
                return this.choose(this.props.c.getLesson().getCurrent().wordButtons ? 'ALWAYS_BUTTONS' : 'ALWAYS_KEYBOARD')
        }
    }

}
