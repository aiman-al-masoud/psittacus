import React, { Component } from "react";
import LessonBuilder from "../../model/lesson/LessonBuilder.js";
import DefinitionsTable from "./DefinitionsTable.jsx";
import Metadata from "./Metadata.jsx";
import L from "../../model/utilities/Language.js"
import "../../index.css"
import TextEditor from "./TextEditor.jsx";
import EditingModes from "./EditingModes.js";
import Styles from "../Styles";


export default class CraftLesson extends Component {

    constructor(props) {
        super(props)
        this.inputSentenceOne = React.createRef()
        this.inputSentenceTwo = React.createRef()
        this.lessonBuilder = props.lessonBuilder ?? new LessonBuilder()
        
        //TODO: (Deduplication) lessonBuilder only as a state, remove this.lessonBuilder 
        this.state = {
            propositionBuilder: this.lessonBuilder.getCurrent(),
            recording: false,
            lessonBuilder: this.lessonBuilder,
            editingMode: EditingModes.LESSON
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


    /**
     * make sure that (eventual) old definitions don't get wiped out every time
     */
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

    onToggleTargetToNative = () => {
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.targetToNative = !propoBuilder.targetToNative
        this.setState({ propositionBuilder: propoBuilder })
    }

    onModifyMetadata = (metadataDict) => {
        this.lessonBuilder.metadata = metadataDict
        this.setState({ lessonBuilder: this.lessonBuilder })
    }

    onExplainationChange = (newExplainationHtmlString) => {
        this.lessonBuilder.setExplanation(newExplainationHtmlString)
        this.setState({lessonBuilder : this.lessonBuilder })
    }

    onWordDictModified = (newDict)=>{
        let updatedDict = this.getUpdatedWordDict(this.state.propositionBuilder.wordDict, newDict)
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.wordDict = updatedDict
        this.setState({ propositionBuilder: propoBuilder }) 
    }
    
    onReverseDictModified = (newDict)=>{
        let updatedDict = this.getUpdatedWordDict(this.state.propositionBuilder.reverseDict, newDict)
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.reverseDict = updatedDict
        this.setState({ propositionBuilder: propoBuilder }) 
    }

    onSave = ()=>{

        try{
            this.lessonBuilder.save()
        }catch(e){
            console.log(e)
            alert("Please complete this lesson's metadata before saving!")
            this.setState({editingMode : EditingModes.METADATA})
        }

    }


    render() {

        let mainBody = (<div>

            <button onClick={() => { this.lessonBuilder.prev(); this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() }) }} className="normal_button" > {L.previous_sentence} </button>
            <button onClick={() => { this.lessonBuilder.next(); this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() }) }} className="normal_button" > {L.next_sentence} </button>
            <br />
            <h1>{L.write_and_pronounce}</h1>
            <div className="text_tip">{L.target_lang_is}</div>
            <input onInput={this.onSentenceOneInput} type="text" ref={this.inputSentenceOne} value={this.state.propositionBuilder.sentenceOne} className="normal_textbox" />
            <button onClick={this.toggleRecorder} className="normal_button" title={L.shortcut_record_audio} >{this.state.recording ? L.stop_recording : L.record}</button>
            <button onClick={this.state.propositionBuilder.playAudio} className="normal_button" title={L.shortcut_play_audio}>{L.play_audio}</button>
            <h1>{L.translate_to_source_lang}</h1>
            <div className="text_tip">{L.source_lang_is}</div>
            <input onInput={this.onSentenceTwoInput} type="text" ref={this.inputSentenceTwo} value={this.state.propositionBuilder.sentenceTwo} className="normal_textbox" />
            <br />
            <h1>{L.write_word_dict}</h1>
            <div className="text_tip">{L.words_will_appear_word_dict}</div>
            <DefinitionsTable wordDict={this.state.propositionBuilder.wordDict} onTableModified={ this.onWordDictModified }   />
            <h1>{L.write_reverse_dict}</h1>
            <div className="text_tip">{L.words_will_appear_reverse_dict}</div>
            <DefinitionsTable wordDict={this.state.propositionBuilder.reverseDict} onTableModified={this.onReverseDictModified} />
            <br />
            <h1>{L.choose_translation_direction}</h1>
            <div className="text_tip">{L.translation_direction_is}</div>
            <input type="checkbox" checked={this.state.propositionBuilder.targetToNative} onClick={this.onToggleTargetToNative} />

        </div>)

        return (<div>

            <button onClick={()=>{ this.setState({editingMode : EditingModes.METADATA}) }} className="normal_button" >{L.edit_metadata}</button>
            <button onClick={()=>{ this.setState({editingMode : EditingModes.LESSON}) }}   className="normal_button" >{L.edit_sentences}</button>
            <button  onClick={()=>{ this.setState({editingMode : EditingModes.EXPLAINATION}) }}  className="normal_button" >{L.edit_explanation}</button>
            <button onClick={() => { this.onSave() }} className="normal_button" title={L.shortcut_save_lesson}>{L.save_lesson}</button>

            <div style={this.state.editingMode==EditingModes.LESSON? Styles.visible : Styles.invisible }>{mainBody}</div>
            <div style={this.state.editingMode==EditingModes.METADATA? Styles.visible : Styles.invisible }> <Metadata metadataDict={this.state.lessonBuilder.metadata} onModifyMetadata={this.onModifyMetadata} /> </div>
            <div style={this.state.editingMode==EditingModes.EXPLAINATION? Styles.visible : Styles.invisible }><TextEditor onTextChange={this.onExplainationChange} text={this.state.lessonBuilder.explanationHtmlString}  /></div>

        </div>)
    }


    componentDidMount(){
        window.addEventListener("keydown", (e)=>{

            //save lesson to computer and override default behavior
            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                this.onSave()
            }

            //play recorded sound
            if(e.code=="Space" && e.shiftKey){
                e.preventDefault();
                this.state.propositionBuilder.playAudio();                  
            }

            //record sound/stop recording
            if(e.code=="Space" && e.ctrlKey){
                e.preventDefault();
                this.toggleRecorder();
            }

        })
    }



}