import React, { Component } from "react";
import LessonBuilder from "../../model/lesson_builder";
import DefinitionsTable from "./definitions_table.jsx";
import Metadata from "./metadata.jsx";


export default class CraftLesson extends Component {

    constructor(props) {
        super(props)

        this.inputSentenceOne = React.createRef()
        this.inputSentenceTwo = React.createRef()

        this.lessonBuilder = props.lessonBuilder ?? new LessonBuilder()
        this.state = {
            propositionBuilder: this.lessonBuilder.getCurrent(),
            recording: false,
            lessonBuilder: this.lessonBuilder,
            editingMetadata: false
        }
    }


    onSentenceOneInput = () => {
        let userInputString = this.inputSentenceOne.current.value
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.sentenceOne = userInputString

        //update dictionary
        let newWords = {}
        userInputString.split(/\s+/).forEach((w) => { newWords[w] = "" })
        propoBuilder.wordDict = this.getUpdatedWordDict(propoBuilder.wordDict, newWords)


        this.setState({ propositionBuilder: propoBuilder })
    }


    // make sure that (eventual) old definitions don't get wiped out every time
    getUpdatedWordDict = (oldWordDict, newWordDict) => {
        Object.entries(oldWordDict).forEach((entry) => { newWordDict[entry[0]] == "" ? newWordDict[entry[0]] = entry[1] : "" })
        return newWordDict
    }

    toggleRecorder = () => {

        if (!this.state.recording) {
            this.lessonBuilder.getCurrent().record()
            this.setState({ recording: true })
        } else {
            this.lessonBuilder.getCurrent().stopRecording()
            this.setState({ recording: false })
            this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() })
        }

    }

    onSentenceTwoInput = () => {
        let userInputString = this.inputSentenceTwo.current.value
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.sentenceTwo = userInputString


        //update dictionary
        let newWords = {}
        userInputString.split(/\s+/).forEach((w) => { newWords[w] = "" })
        propoBuilder.reverseDict = this.getUpdatedWordDict(propoBuilder.reverseDict, newWords)


        this.setState({ propositionBuilder: propoBuilder })

    }

    onToggleTargetToNative = () => {
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.targetToNative = !propoBuilder.targetToNative
        this.setState({ propositionBuilder: propoBuilder })
    }

    onModifyMedata = (metadataDict) => {
        this.lessonBuilder.metadata = metadataDict
        this.setState({ lessonBuilder: this.lessonBuilder })
    }


    render() {

        let mainBody = (<div>

            <button onClick={() => { this.lessonBuilder.prev(); this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() }) }}   >Previous Sentence</button>
            <button onClick={() => { this.lessonBuilder.next(); this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() }) }}   >Next Sentence</button>

            <br />
            <h1>Write and pronounce a sentence in the target language:</h1>
            <div className="text_tip">The target language is the language that your students wish to learn.</div>

            <input onInput={this.onSentenceOneInput} type="text" ref={this.inputSentenceOne} value={this.state.propositionBuilder.sentenceOne} />
            <button onClick={this.toggleRecorder}>{this.state.recording ? "Stop Recording" : "Record"}</button>
            <button onClick={this.state.propositionBuilder.playAudio}>Play</button>
            <h1>Translate it to the source language:</h1>
            <div className="text_tip">The source language is the language that your students understand.</div>

            <input onInput={this.onSentenceTwoInput} type="text" ref={this.inputSentenceTwo} value={this.state.propositionBuilder.sentenceTwo} />
            <br />
            <h1>Give a brief definition of each word from the target language:</h1>
            <div className="text_tip">Words will appear here as you type in the sentence in the target language.</div>

            <DefinitionsTable wordDict={this.state.propositionBuilder.wordDict} onTableModified={(newDict) => {  /*console.log(newDict)*/   let updatedDict = this.getUpdatedWordDict(this.state.propositionBuilder.wordDict, newDict); let propoBuilder = this.lessonBuilder.getCurrent(); propoBuilder.wordDict = updatedDict; this.setState({ propositionBuilder: propoBuilder }) }} />

            <h1>Do the same, but in the opposite direction:</h1>
            <div className="text_tip">Words will appear here as you type in the sentence in the source language.</div>

            <DefinitionsTable wordDict={this.state.propositionBuilder.reverseDict} onTableModified={(newDict) => {  /*console.log(newDict)*/   let updatedDict = this.getUpdatedWordDict(this.state.propositionBuilder.reverseDict, newDict); let propoBuilder = this.lessonBuilder.getCurrent(); propoBuilder.reverseDict = updatedDict; this.setState({ propositionBuilder: propoBuilder }) }} />



            <br />
            <h1>Choose the Direction of Translation:</h1>
            <div className="text_tip">By default students will be asked to translate from target to source. But you can change that by un-checking this box:</div>

            <input type="checkbox" checked={this.state.propositionBuilder.targetToNative} onClick={this.onToggleTargetToNative} />

        </div>)

        return (<div>

            <button onClick={() => { this.setState({ editingMetadata: !this.state.editingMetadata }) }}  >{this.state.editingMetadata ? "Edit Lesson" : "Edit Metadata"}  </button>
            <button onClick={() => { this.lessonBuilder.save() }}  >Save Lesson</button>

            {this.state.editingMetadata ? <Metadata metadataDict={this.state.lessonBuilder.metadata} onModifyMetadata={this.onModifyMedata} /> : mainBody}


        </div>)
    }



}