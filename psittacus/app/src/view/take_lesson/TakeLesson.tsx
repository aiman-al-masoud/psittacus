import React, { Component } from "react";
import { Context } from "../../model/context/Context.js";
import InputManager from "./InputManager";
import HoverableSentence from "./HoverableSentence"
import LessonOver from "./LessonOver";
import Explanation from "./Explanation";
import "../../index.css"

//@ts-ignore
import Styles from "../Styles.js";


type Props = { c: Context }

export default class TakeLesson extends Component<Props, {}> {

    readonly userInput = React.createRef<HTMLInputElement>()
    protected main: any

    constructor(props: Props) {
        super(props)
        this.props.c.get('LESSON').getCurrent().play()
        this.props.c.set('USER_ACCURACY', 0)
        this.props.c.set('SOLUTION_HIDDEN', true)
        this.props.c.set('OVERALL_USER_ACCURACY', 0)
        this.props.c.set('PLAY_MODE', 'STANDARD')
    }

    next = () => {

        if (this.props.c.get('SOLUTION_HIDDEN')) {
            this.props.c.set('USER_ACCURACY', this.props.c.get('LESSON').getCurrent().check(this.userInput.current?.value ?? ''))
            this.props.c.get('LESSON').getCurrent().targetToNative ? "" : this.props.c.get('LESSON').getCurrent().play()
        } else {
            this.props.c.get('LESSON').next();
            this.props.c.forceUpdate();
            (this.userInput.current as any).value = ""
            this.props.c.get('LESSON').getCurrent().play()
        }

        this.props.c.set('SOLUTION_HIDDEN', !this.props.c.get('SOLUTION_HIDDEN'))
        this.props.c.set('PLAY_MODE', this.props.c.get('LESSON').isOver() ? 'LESSON_OVER' : this.props.c.get('PLAY_MODE'))
        this.props.c.set('OVERALL_USER_ACCURACY', this.props.c.get('LESSON').getScore())

    }

    render() {
        this.main = (<div>
            <h1>{this.props.c.L.translate_this_sentence}</h1>

            <div style={{ width: "50vw" }}>
                <div className="text_tip">{this.props.c.L.need_a_tip_hover_words}</div>
                <br />
                <HoverableSentence wordDict={this.props.c.get('LESSON').getCurrent().getQuestionWordDict()} />

                <button
                    onClick={this.props.c.get('LESSON').getCurrent().play}
                    className="play_audio_button"
                    style={(this.props.c.get('LESSON').getCurrent().targetToNative && (this.props.c.get('PLAY_MODE') != 'LESSON_OVER')) ? Styles.visibleInline : Styles.invisible}
                    title={`${this.props.c.L.play_audio} (${this.props.c.L.shortcut_play_audio})`}>
                    <img src={this.props.c.icons.PlayAudio} />  </button>

            </div>

            <br />
            <InputManager c={this.props.c} userInput={this.userInput} />
            <br />
            <button onClick={this.next} className="normal_button">{this.props.c.get('SOLUTION_HIDDEN') ? this.props.c.L.see_solution : this.props.c.L.next}  </button>
            <br />
            <div style={this.props.c.get('SOLUTION_HIDDEN') ? Styles.invisible : Styles.visible}>
                <h1>{this.props.c.L.solution}:</h1>

                <div style={{ width: "50vw" }}>
                    <div className="text_tip">{this.props.c.L.need_a_tip_hover_words}</div>
                    <br />
                    <HoverableSentence wordDict={this.props.c.get('LESSON').getCurrent().getAnswerWordDict()} />
                    <button onClick={this.props.c.get('LESSON').getCurrent().play} className="play_audio_button" style={((!this.props.c.get('LESSON').getCurrent().targetToNative) && (this.props.c.get('PLAY_MODE') != 'LESSON_OVER')) ? Styles.visibleInline : Styles.invisible} title={`${this.props.c.L.play_audio} (${this.props.c.L.shortcut_play_audio})`}>   <img src={this.props.c.icons.PlayAudio} />  </button>
                </div>

                <h2>{this.props.c.L.your_accuracy}: {this.props.c.get('USER_ACCURACY')}%</h2>
            </div>
            <br />
            <span className="text_tip">{this.props.c.L.need_a_lot_of_tips} <button className="normal_link" onClick={() => { this.props.c.set('PLAY_MODE', 'EXPLANATION') }}>{this.props.c.L.read_explanation}</button></span>
        </div>)

        switch (this.props.c.get('PLAY_MODE')) {
            case 'STANDARD':
                return this.main;
            case 'EXPLANATION':
                return <Explanation c={this.props.c} explanationText={this.props.c.get('LESSON').getExplaination()} onBack={() => { this.props.c.set('PLAY_MODE', 'STANDARD') }} />
            case 'LESSON_OVER':
                return <LessonOver c={this.props.c} overallUserAccuracy={this.props.c.get('OVERALL_USER_ACCURACY')} />
        }

    }

    keyListener = (e: KeyboardEvent) => {
        if (e.code == "Space" && e.shiftKey) {
            e.preventDefault();
            this.props.c.get('LESSON').getCurrent().play()
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyListener)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyListener)
    }

}