import React, { Component } from "react";
import ButtonWord from "./ButtonWord.jsx";

const selected = 'selected';

export default class ButtonInput extends Component {

    constructor(props) {
        super(props);
        const useDict = 
            props.proposition.targetToNative ? 
                props.proposition.reverseDict : props.proposition.wordDict;
        const words = Object.keys(useDict);
        const extraWords = props.proposition.extraWords.split(' ');
        
        this.buttonTexts = this.shuffleArray(words.concat(extraWords));
        this.selectedWords = [];
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    onDeselectButton(e) {
        console.log('deselect');
        const this_button = e.target;
        const splitted_id = e.target.id.split('_');
        const unselected_id = splitted_id[0] + '_' + splitted_id[1];

        // make the selected button vissible and hide this
        const selected_button = document.querySelector('#' + unselected_id);
        selected_button.style = 'display: initial';
        this_button.style = 'display: none';

        // remove value to phrase input

        console.log(e);
    }

    onSelectButton(e) {
        console.log('select');
        const this_button = e.target;
        const selected_id = e.target.id + '_' + selected;

        // make the selected button vissible and hide this
        const selected_button = document.querySelector('#' + selected_id);
        selected_button.style = 'display: initial';
        this_button.style = 'display: none';

        // add value to phrase input

        console.log(e);
    }

    render() {
        return (
            <div id="button_words" className="button_container">
                <div id="button_selected" className="button_container">
                {this.buttonTexts.map((text, idx) => <ButtonWord id={'bword_'+idx+'_'+selected} key={idx} text={text} isHidden={true} onClick={this.onDeselectButton} />)}
                </div>
                <div id="button_choices" className="button_container">
                {this.buttonTexts.map((text, idx) => <ButtonWord id={'bword_'+idx} key={idx} text={text} isHidden={false} onClick={this.onSelectButton} />)}
                </div>
                <input ref={this.props.userInput} type="hidden" className="normal_textbox" />
            </div>
        )
    }

}
