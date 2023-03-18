import React, { Component } from "react";
import LessonBuilder from "../../model/lesson/LessonBuilder.js";
import DefinitionsTable from "./DefinitionsTable.jsx";
import Metadata from "./Metadata.jsx";
import L from "../../model/utilities/Language.js"
import "../../index.css"
import TextEditor from "./TextEditor.jsx";
import EditingModes from "./EditingModes.js";
import Styles from "../Styles";
import { sendBugReport } from "../../model/utilities/Utils.js";
import MenuButton from "../recycled/buttons/MenuButton.jsx";
import * as Icon from 'react-feather';


export default class CraftLesson extends Component {

    constructor(props) {
        super(props)
        this.inputSentenceOne = React.createRef()
        this.inputSentenceTwo = React.createRef()
        this.inputExtraWords = React.createRef()
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

        propoBuilder.setSentenceOne(userInputString)

        let newWords = {}
        userInputString.split(/\s+/).forEach((w) => { newWords[w] = "" })
        const updatedDict = this.getUpdatedWordDict(propoBuilder.word_dict, newWords)
        propoBuilder.setWordDict(updatedDict)

        this.setState({ propositionBuilder: propoBuilder })
    }

    onSentenceTwoInput = () => {
        let userInputString = this.inputSentenceTwo.current.value
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.setSentenceTwo(userInputString)

        //update dictionary
        let newWords = {}
        userInputString.split(/\s+/).forEach((w) => { newWords[w] = "" })
        propoBuilder.setReverseDict(this.getUpdatedWordDict(propoBuilder.reverse_dict, newWords))

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

            setTimeout(() => {
                this.lessonBuilder.getCurrent().record()
                this.setState({ recording: true })
            }, 500);

        } else {
            this.lessonBuilder.getCurrent().stopRecording()
            this.setState({ recording: false })
            this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() })
        }
    }

    onToggleTargetToNative = () => {
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.invertTranslationDirection()
        this.setState({ propositionBuilder: propoBuilder })
    }

    onToggleWordButtons = () => {
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.invertWordButtons()
        this.setState({ propositionBuilder: propoBuilder })
    }

    onModifyMetadata = (metadataDict) => {
        this.lessonBuilder.metadata = metadataDict
        this.setState({ lessonBuilder: this.lessonBuilder })
    }

    onExplainationChange = (newExplainationHtmlString) => {
        this.lessonBuilder.setExplanation(newExplainationHtmlString)
        this.setState({ lessonBuilder: this.lessonBuilder })
    }

    onWordDictModified = (newDict) => {
        let updatedDict = this.getUpdatedWordDict(this.state.propositionBuilder.word_dict, newDict)
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.setWordDict(updatedDict)
        this.setState({ propositionBuilder: propoBuilder })
    }

    onReverseDictModified = (newDict) => {
        let updatedDict = this.getUpdatedWordDict(this.state.propositionBuilder.reverse_dict, newDict)
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.setReverseDict(updatedDict)
        this.setState({ propositionBuilder: propoBuilder })
    }

    onExtraWordsModified = () => {
        let propoBuilder = this.lessonBuilder.getCurrent()
        propoBuilder.setExtraWords(this.inputExtraWords.current.value)
        this.setState({ propositionBuilder: propoBuilder })
    }

    onSave = () => {

        try {
            this.lessonBuilder.save()
        } catch (e) {
            switch (e) { //handle exceptions
                case LessonBuilder.MetadataIncompleteError:
                    alert(L.please_complete_metadata)
                    this.setState({ editingMode: EditingModes.METADATA })
                    break
                default:
                    sendBugReport(e.toString() + " " + e.stack)
            }
        }

    }


    render() {

        let mainBody = (<div>

            {/* Back and forth between propositions */}
            <div className="center_container">
                <MenuButton onClick={() => { this.lessonBuilder.prev(); this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() }) }} title={L.previous_sentence} icon={Icon.ArrowRight} flippedX={true} />
                {/* this gets re-rendered (works) because next already triggers a re-render, not because this.lessonBuilder is being explicitly tracked. */}
                <span title={L.current_sentence} style={{ cursor: "default" }}>
                    {this.lessonBuilder.currentIndex()} / {this.lessonBuilder.size()}
                </span>
                <MenuButton onClick={() => { this.lessonBuilder.next(); this.setState({ propositionBuilder: this.lessonBuilder.getCurrent() }) }} title={L.next_sentence} icon={Icon.ArrowRight} />
            </div>

            <br />
            <h1>{L.write_and_pronounce}</h1>
            <div className="text_tip">{L.target_lang_is}</div>


            <div className="vertical_center_container">
                <input onInput={this.onSentenceOneInput} type="text" ref={this.inputSentenceOne} value={this.state.propositionBuilder.sentenceOne} className="normal_textbox" />
                <MenuButton onClick={this.toggleRecorder} title={`${L.record} (${L.shortcut_record_audio})`} icon={Icon.Mic} highlight={this.state.recording} />
                <MenuButton onClick={this.state.propositionBuilder.playAudio} title={`${L.play_audio} (${L.shortcut_play_audio})`} icon={Icon.Play} />
            </div>


            <h1>{L.translate_to_source_lang}</h1>
            <div className="text_tip">{L.source_lang_is}</div>
            <input onInput={this.onSentenceTwoInput} type="text" ref={this.inputSentenceTwo} value={this.state.propositionBuilder.sentenceTwo} className="normal_textbox" />
            <br />
            <h1>{L.write_word_dict}</h1>
            <div className="text_tip">{L.words_will_appear_word_dict}</div>
            <div className="text_tip">{L.words_will_appear}</div>
            <DefinitionsTable wordDict={this.state.propositionBuilder.wordDict} onTableModified={this.onWordDictModified} />
            <h1>{L.write_reverse_dict}</h1>
            <div className="text_tip">{L.words_will_appear_reverse_dict}</div>
            <div className="text_tip">{L.words_will_appear}</div>
            <DefinitionsTable wordDict={this.state.propositionBuilder.reverseDict} onTableModified={this.onReverseDictModified} />
            <br />
            <h1>{L.choose_translation_direction}</h1>
            <div className="text_tip">{L.translation_direction_is}</div>
            {L.target_to_native} <input type="checkbox" checked={this.state.propositionBuilder.targetToNative} onClick={this.onToggleTargetToNative} />
            <br />
            <h1>{L.choose_word_buttons}</h1>
            <div className="text_tip">{L.word_buttons_is}</div>
            {L.choose_word_buttons} <input type="checkbox" checked={this.state.propositionBuilder.wordButtons} onClick={this.onToggleWordButtons} />
            <br />
            <h1>{L.extra_words}</h1>
            <div className="text_tip">{L.extra_words_are}</div>
            <input id="extra_words" type="text" onInput={this.onExtraWordsModified} ref={this.inputExtraWords} value={this.state.propositionBuilder.extraWords} className="normal_textbox" disabled={this.state.propositionBuilder.wordButtons ? '' : 'disabled'} />
        </div>)

        return (<div>

            <MenuButton onClick={() => { this.setState({ editingMode: EditingModes.METADATA }) }} title={L.edit_metadata} icon={Icon.Tag} highlight={this.state.editingMode == EditingModes.METADATA} />
            <MenuButton onClick={() => { this.setState({ editingMode: EditingModes.LESSON }) }} title={L.edit_sentences} icon={Icon.Edit} highlight={this.state.editingMode == EditingModes.LESSON} />
            <MenuButton onClick={() => { this.setState({ editingMode: EditingModes.EXPLAINATION }) }} title={L.edit_explanation} icon={Icon.BookOpen} highlight={this.state.editingMode == EditingModes.EXPLAINATION} />
            <MenuButton onClick={() => { this.onSave() }} title={`${L.save_lesson} (${L.shortcut_save_lesson})`} icon={Icon.Save} />

            <div style={this.state.editingMode == EditingModes.LESSON ? Styles.visible : Styles.invisible}>{mainBody}</div>
            <div style={this.state.editingMode == EditingModes.METADATA ? Styles.visible : Styles.invisible}> <Metadata metadataDict={this.state.lessonBuilder.metadata} onModifyMetadata={this.onModifyMetadata} /> </div>
            <div style={this.state.editingMode == EditingModes.EXPLAINATION ? Styles.visible : Styles.invisible}><TextEditor onTextChange={this.onExplainationChange} text={this.state.lessonBuilder.explanationHtmlString} /></div>

        </div>)
    }


    componentDidMount() {
        window.addEventListener("keydown", this.keyListener = (e) => {

            //save lesson to computer and override default behavior
            if ((e.code == "KeyS") && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                console.log("called save with keybinding")
                this.onSave()
                return
            }

            //play recorded sound
            if (e.code == "Space" && e.shiftKey) {
                e.preventDefault();
                this.state.propositionBuilder.playAudio();
                return
            }

            //record sound/stop recording
            if (e.code == "Space" && e.ctrlKey) {
                e.preventDefault();
                this.toggleRecorder();
                return
            }

        })
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyListener)
    }


}