import React, { Component } from "react";
import L from "../../model/utilities/Language.js"
import ButtonWord from "./ButtonWord.jsx";

export default class ButtonInput extends Component {

    constructor(props) {
        super(props)
    }

    shuffleArray(array) {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    onSelectButton = (b) => {

        // TODO: may present a problem for repeated words in same sentence, make better ID
        if (this.selectedWords.includes(b)) {
            this.selectedWords = this.selectedWords.filter(w => w !== b)
            this.unusedWords.push(b)
        } else {
            this.unusedWords = this.unusedWords.filter(w => w !== b)
            this.selectedWords.push(b)
        }

        // // fill phrase input
        const phrase_input = document.querySelector('#phrase_input')
        phrase_input.value = this.selectedWords.join(' ')

        this.forceUpdate()
    }

    render() {

        const useDict = this.props.proposition.targetToNative ? this.props.proposition.reverseDict : this.props.proposition.wordDict
        const words = Object.keys(useDict)
        const extraWords = this.props.proposition.extraWords.split(' ')

        if (this.currentPropositionHash !== this.props.proposition.getHash()) {
            this.currentPropositionHash = this.props.proposition.getHash()
            this.unusedWords = words.concat(extraWords).filter(w => w.trim())
            this.selectedWords = []
        }

        return (
            <div id="button_words" className="button_container">
                <div id="button_selected" className="button_container">
                    <h4>{L.your_answer}</h4>
                    {this.selectedWords.map((text, idx) => <ButtonWord id={'bword_' + idx} key={idx} text={text} onClick={this.onSelectButton} />)}
                </div>
                <div id="button_choices" className="button_container">
                    <h4>{L.available_words}</h4>
                    {this.unusedWords.map((text, idx) => <ButtonWord id={'bword_' + idx} key={idx} text={text} onClick={this.onSelectButton} />)}
                </div>
                <input id="phrase_input" ref={this.props.userInput} type="hidden" className="normal_textbox" />
            </div>
        )
    }

}
