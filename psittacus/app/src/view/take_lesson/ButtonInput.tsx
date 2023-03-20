import React, { Component } from "react";
import { Context } from "../../model/context/Context.js";
import ButtonWord from "./ButtonWord";


export default class ButtonInput extends Component<{ c: Context, userInput: any }> {

    protected currentPropositionHash: any
    protected unusedWords: string[] = []
    protected selectedWords: string[] = []


    shuffleArray(array: any[]) {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    onSelectButton = (b: any) => {

        // TODO: may present a problem for repeated words in same sentence, make better ID
        if (this.selectedWords.includes(b)) {
            this.selectedWords = this.selectedWords.filter(w => w !== b)
            this.unusedWords.push(b)
        } else {
            this.unusedWords = this.unusedWords.filter(w => w !== b)
            this.selectedWords.push(b)
        }

        // // fill phrase input
        const phrase_input = document.querySelector<HTMLInputElement>('#phrase_input')!
        phrase_input.value = this.selectedWords.join(' ')

        this.forceUpdate()
    }

    render() {

        const useDict = this.props.c.get('LESSON').getCurrent().targetToNative ? this.props.c.get('LESSON').getCurrent().reverseDict : this.props.c.get('LESSON').getCurrent().wordDict
        const words = Object.keys(useDict)
        const extraWords = this.props.c.get('LESSON').getCurrent().extraWords.split(' ')

        if (this.currentPropositionHash !== this.props.c.get('LESSON').getCurrent().getHash()) {
            this.currentPropositionHash = this.props.c.get('LESSON').getCurrent().getHash()
            this.unusedWords = words.concat(extraWords).filter(w => w.trim())
            this.selectedWords = []
        }

        return (
            <div id="button_words" className="button_container">
                <div id="button_selected" className="button_container">
                    <h4>{this.props.c.L.your_answer}</h4>
                    {this.selectedWords.map((text, idx) => <ButtonWord id={'bword_' + idx} key={idx} text={text} onClick={this.onSelectButton} />)}
                </div>
                <div id="button_choices" className="button_container">
                    <h4>{this.props.c.L.available_words}</h4>
                    {this.unusedWords.map((text, idx) => <ButtonWord id={'bword_' + idx} key={idx} text={text} onClick={this.onSelectButton} />)}
                </div>
                <input id="phrase_input" ref={this.props.userInput} type="hidden" className="normal_textbox" />
            </div>
        )
    }

}
