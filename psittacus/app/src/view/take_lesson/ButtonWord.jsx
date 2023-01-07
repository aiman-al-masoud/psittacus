import React, { Component } from "react";

export default class ButtonWord extends Component {

    constructor(props) {
        super(props)
        this.selectedWords = this.props.selectedWords;
    }

    onClickButton = (e) => {
        // move button
        const this_button = e.target;
        const parent_elem = this_button.parentElement;
        const new_parent_id = parent_elem.id === 'button_selected' ? 'button_choices' : 'button_selected';
        const new_parent = document.querySelector('#' + new_parent_id);
        new_parent.appendChild(parent_elem.removeChild(this_button));

        // add value to phrase array
        const word_value = this_button.innerText;
        const add_word = parent_elem.id === 'button_choices' ? true : false;

        if (add_word)
            this.selectedWords.push(word_value);
        else {
            const idx_word = this.selectedWords.indexOf(word_value);
            if (idx_word !== -1){
                this.selectedWords.splice(idx_word, 1);
            }
        }

        // fill phrase input
        const phrase_input = document.querySelector('#phrase_input');
        phrase_input.value = this.selectedWords.join(' ');
    };

    render() {
        return (
            <button id={this.props.id} className="word_button" onClick={this.onClickButton}>{this.props.text}</button>
        )
    }

}
