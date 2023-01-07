import React, { Component } from "react";
import ButtonWord from "./ButtonWord.jsx";


export default class ButtonInput extends Component {

    constructor(props) {
        super(props);
        const useDict = 
            props.proposition.targetToNative ? 
                props.proposition.reverseDict : props.proposition.wordDict;
        const words = Object.keys(useDict);
        const extraWords = props.proposition.extraWords.split(' ');
        
        this.buttonTexts = this.shuffleArray(words.concat(extraWords));
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    render() {
        return (
            <div id="button_words" className="button_container">
                <div id="button_selected" className="button_container">
                {this.buttonTexts.map((text, idx) => <ButtonWord id={'bword_'+idx} key={idx} text={text} isHidden={true} />)}
                </div>
                <div id="button_choices" className="button_container">
                {this.buttonTexts.map((text, idx) => <ButtonWord id={'bword_'+idx} key={idx} text={text} isHidden={false} />)}
                </div>
                <input ref={this.props.userInput} type="hidden" className="normal_textbox" />
            </div>
        )
    }

}
