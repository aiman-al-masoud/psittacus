import React, { Component } from "react";
import { Context } from "../../model/Context";
import { MetadataIncompleteError } from "../../model/lesson/LessonBuilder";
import { WordDict } from "../../model/proposition/PropositionBuilder";
import MenuButton from "../recycled/buttons/MenuButton";
import { sendBugReport } from "../../model/utilities/sendBugReport";
import DefinitionsTable from "./DefinitionsTable";
import MetadataTable from "./MetadataTable";
import { Metadata } from "../../model/lesson/LessonBuilder";
import TextEditor from "./TextEditor";
import "../../index.css"

//@ts-ignore
import Styles from "../Styles";


type Props = { c: Context }

export default class CraftLesson extends Component<Props> {

    readonly inputSentenceOne = React.createRef<HTMLInputElement>()
    readonly inputSentenceTwo = React.createRef<HTMLInputElement>()
    readonly inputExtraWords = React.createRef<HTMLInputElement>()

    constructor(props: Props) {
        super(props)
        this.props.c.set('RECORDING', false)
        this.props.c.set('EDITING_MODE', 'LESSON')
    }

    onSentenceOneInput = () => {

        const userInputString = this.inputSentenceOne.current?.value ?? ''
        this.props.c.getLessonBuilder().getCurrent().setSentenceOne(userInputString)

        const newWords = userInputString.split(/\s+/).map(w => ({ [w]: '' })).reduce((a, b) => ({ ...a, ...b }))
        const updatedDict = this.getUpdatedWordDict(this.props.c.getLessonBuilder().getCurrent().wordDict, newWords)
        this.props.c.getLessonBuilder().getCurrent().setWordDict(updatedDict)
        this.props.c.forceUpdate()

    }

    onSentenceTwoInput = () => {

        const userInputString = this.inputSentenceTwo.current?.value ?? ''
        this.props.c.getLessonBuilder().getCurrent().setSentenceTwo(userInputString)

        const newWords = userInputString.split(/\s+/).map(w => ({ [w]: '' })).reduce((a, b) => ({ ...a, ...b }))
        const updatedDict = this.getUpdatedWordDict(this.props.c.getLessonBuilder().getCurrent().reverseDict, newWords)
        this.props.c.getLessonBuilder().getCurrent().setReverseDict(updatedDict)
        this.props.c.forceUpdate()

    }

    /**
     * make sure that (eventual) old definitions don't get wiped out every time
     */
    getUpdatedWordDict = (oldWordDict: WordDict, newWordDict: WordDict) => {
        Object.entries(oldWordDict).forEach((entry) => { newWordDict[entry[0]] == "" ? newWordDict[entry[0]] = entry[1] : "" })
        return newWordDict
    }

    toggleRecorder = () => {
        if (!this.props.c.get('RECORDING')) {

            setTimeout(() => {
                this.props.c.getLessonBuilder().getCurrent().record()
                this.props.c.set('RECORDING', true)
            }, 500)

        } else {
            this.props.c.getLessonBuilder().getCurrent().stopRecording()
            this.props.c.set('RECORDING', false)
        }
    }

    onToggleTargetToNative = () => {
        this.props.c.getLessonBuilder().getCurrent().invertTranslationDirection()
        this.props.c.forceUpdate()
    }

    onToggleWordButtons = () => {
        this.props.c.getLessonBuilder().getCurrent().invertWordButtons()
        this.props.c.forceUpdate()
    }

    onModifyMetadata = (metadataDict: Metadata) => {
        this.props.c.getLessonBuilder().setMetadata(metadataDict)
        this.props.c.forceUpdate()
    }

    onExplainationChange = (newExplainationHtmlString: string) => {
        this.props.c.getLessonBuilder().setExplanation(newExplainationHtmlString)
        this.props.c.forceUpdate()
    }

    onWordDictModified = (newDict: WordDict) => {
        let updatedDict = this.getUpdatedWordDict(this.props.c.getLessonBuilder().getCurrent().wordDict, newDict)
        this.props.c.getLessonBuilder().getCurrent().setWordDict(updatedDict)
        this.props.c.forceUpdate()
    }

    onReverseDictModified = (newDict: WordDict) => {
        let updatedDict = this.getUpdatedWordDict(this.props.c.getLessonBuilder().getCurrent().reverseDict, newDict)
        this.props.c.getLessonBuilder().getCurrent().setReverseDict(updatedDict)
        this.props.c.forceUpdate()
    }

    onExtraWordsModified = () => {
        this.props.c.getLessonBuilder().getCurrent().setExtraWords(this.inputExtraWords.current?.value ?? '')
        this.props.c.forceUpdate()
    }

    onSave = () => {

        try {
            this.props.c.getLessonBuilder().save()
        } catch (e: any) {
            switch (e) { //handle exceptions
                case MetadataIncompleteError:
                    alert(this.props.c.L.please_complete_metadata)
                    this.props.c.set('EDITING_MODE', 'METADATA')
                    break
                default:
                    sendBugReport(e.toString() + " " + e.stack, this.props.c)
            }
        }

    }

    render() {

        let mainBody = (<div>

            <div className="center_container">

                <MenuButton onClick={() => {
                    this.props.c.getLessonBuilder().prev()
                    this.props.c.forceUpdate()
                }}
                    title={this.props.c.L.previous_sentence} icon={this.props.c.icons.ArrowRight} flippedX={true} />

                <span title={this.props.c.L.current_sentence} style={{ cursor: "default" }}>
                    {this.props.c.getLessonBuilder().currentIndex()} / {this.props.c.getLessonBuilder().size()}
                </span>

                <MenuButton onClick={() => {
                    this.props.c.getLessonBuilder().next()
                    this.props.c.forceUpdate()
                }}
                    title={this.props.c.L.next_sentence}
                    icon={this.props.c.icons.ArrowRight} />

            </div>

            <br />
            <h1>{this.props.c.L.write_and_pronounce}</h1>
            <div className="text_tip">{this.props.c.L.target_lang_is}</div>

            <div className="vertical_center_container">
                <input onInput={this.onSentenceOneInput} type="text" ref={this.inputSentenceOne} value={this.props.c.getLessonBuilder().getCurrent().sentenceOne} className="normal_textbox" />
                <MenuButton onClick={this.toggleRecorder} title={`${this.props.c.L.record} (${this.props.c.L.shortcut_record_audio})`} icon={this.props.c.icons.Mic} highlight={this.props.c.get('RECORDING')} />
                <MenuButton onClick={this.props.c.getLessonBuilder().getCurrent().playAudio} title={`${this.props.c.L.play_audio} (${this.props.c.L.shortcut_play_audio})`} icon={this.props.c.icons.Play} />
            </div>

            <h1>{this.props.c.L.translate_to_source_lang}</h1>
            <div className="text_tip">{this.props.c.L.source_lang_is}</div>
            <input onInput={this.onSentenceTwoInput} type="text" ref={this.inputSentenceTwo} value={this.props.c.getLessonBuilder().getCurrent().sentenceTwo} className="normal_textbox" />
            <br />
            <h1>{this.props.c.L.write_word_dict}</h1>
            <div className="text_tip">{this.props.c.L.words_will_appear_word_dict}</div>
            <div className="text_tip">{this.props.c.L.words_will_appear}</div>
            <DefinitionsTable wordDict={this.props.c.getLessonBuilder().getCurrent().wordDict} onTableModified={this.onWordDictModified} />
            <h1>{this.props.c.L.write_reverse_dict}</h1>
            <div className="text_tip">{this.props.c.L.words_will_appear_reverse_dict}</div>
            <div className="text_tip">{this.props.c.L.words_will_appear}</div>
            <DefinitionsTable wordDict={this.props.c.getLessonBuilder().getCurrent().reverseDict} onTableModified={this.onReverseDictModified} />
            <br />
            <h1>{this.props.c.L.choose_translation_direction}</h1>
            <div className="text_tip">{this.props.c.L.translation_direction_is}</div>
            {this.props.c.L.target_to_native} <input type="checkbox" checked={this.props.c.getLessonBuilder().getCurrent().targetToNative} onClick={this.onToggleTargetToNative} />
            <br />
            <h1>{this.props.c.L.choose_word_buttons}</h1>
            <div className="text_tip">{this.props.c.L.word_buttons_is}</div>
            {this.props.c.L.choose_word_buttons} <input type="checkbox" checked={this.props.c.getLessonBuilder().getCurrent().wordButtons} onClick={this.onToggleWordButtons} />
            <br />
            <h1>{this.props.c.L.extra_words}</h1>
            <div className="text_tip">{this.props.c.L.extra_words_are}</div>
            <input id="extra_words" type="text" onInput={this.onExtraWordsModified} ref={this.inputExtraWords} value={this.props.c.getLessonBuilder().getCurrent().extraWords} className="normal_textbox" disabled={!this.props.c.getLessonBuilder().getCurrent().wordButtons} />
        </div>)

        return (<div>

            <MenuButton onClick={() => { this.props.c.set('EDITING_MODE', 'METADATA') }} title={this.props.c.L.edit_metadata} icon={this.props.c.icons.Tag} highlight={this.props.c.get('EDITING_MODE') == 'METADATA'} />
            <MenuButton onClick={() => { this.props.c.set('EDITING_MODE', 'LESSON') }} title={this.props.c.L.edit_sentences} icon={this.props.c.icons.Edit} highlight={this.props.c.get('EDITING_MODE') == 'LESSON'} />
            <MenuButton onClick={() => { this.props.c.set('EDITING_MODE', 'EXPLAINATION') }} title={this.props.c.L.edit_explanation} icon={this.props.c.icons.BookOpen} highlight={this.props.c.get('EDITING_MODE') == 'EXPLAINATION'} />
            <MenuButton onClick={() => { this.onSave() }} title={`${this.props.c.L.save_lesson} (${this.props.c.L.shortcut_save_lesson})`} icon={this.props.c.icons.Save} />

            <div style={this.props.c.get('EDITING_MODE') == 'LESSON' ? Styles.visible : Styles.invisible}>{mainBody}</div>
            <div style={this.props.c.get('EDITING_MODE') == 'METADATA' ? Styles.visible : Styles.invisible}> <MetadataTable c={this.props.c} metadataDict={this.props.c.getLessonBuilder().getMetadata()} onModifyMetadata={this.onModifyMetadata} /> </div>
            <div style={this.props.c.get('EDITING_MODE') == 'EXPLAINATION' ? Styles.visible : Styles.invisible}><TextEditor c={this.props.c} onTextChange={this.onExplainationChange} text={this.props.c.getLessonBuilder().getExplanation()} /></div>

        </div>)
    }

    keyListener = (e: KeyboardEvent) => {

        //save lesson to computer and override default behavior
        if ((e.code == 'KeyS') && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            this.onSave()
            return
        }

        //play recorded sound
        if (e.code == 'Space' && e.shiftKey) {
            e.preventDefault();
            this.props.c.getLessonBuilder().getCurrent().playAudio();
            return
        }

        //record sound/stop recording
        if (e.code == 'Space' && e.ctrlKey) {
            e.preventDefault();
            this.toggleRecorder();
            return
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keyListener)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyListener)
    }

}