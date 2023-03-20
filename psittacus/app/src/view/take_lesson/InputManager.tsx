import React, { Component } from "react";
import { Context } from "../../model/Context.js";
import { InputType } from "../../model/settings/Settings.js";
import TextInput from "./TextInput";
import ButtonInput from "./ButtonInput";


export default class InputManager extends Component<{ c: Context, userInput: any }> {

    render() {
        return this.choose(this.props.c.get('INPUT_TYPE'))
    }

    choose = (inputType: InputType): JSX.Element => {
        switch (inputType) {
            case 'ALWAYS_BUTTONS':
                return <ButtonInput c={this.props.c} userInput={this.props.userInput} />
            case 'ALWAYS_KEYBOARD':
                return <TextInput userInput={this.props.userInput} />
            case 'LESSON_DEFAULT':
                return this.choose(this.props.c.get('LESSON').getCurrent().wordButtons ? 'ALWAYS_BUTTONS' : 'ALWAYS_KEYBOARD')
        }
    }

}
