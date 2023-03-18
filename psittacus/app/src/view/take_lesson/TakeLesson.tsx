import React, { Component } from "react";
import { Context } from "../../model/Context.js";
import "../../index.css"

//@ts-ignore
import HoverableSentence from "./HoverableSentence.jsx";
//@ts-ignore
import InputManager from "./InputManager.jsx";
//@ts-ignore
import Modes from "./Modes.js";
//@ts-ignore
import Styles from "../Styles.js";
//@ts-ignore
import Explanation from "./Explanation.jsx";
//@ts-ignore
import LessonOver from "./LessonOver.jsx";
//@ts-ignore
import PlayAudioIcon from "../../../res/play-audio.png"


type Props = { c: Context }

export default class TakeLesson extends Component<Props, {}> {

    readonly userInput = React.createRef<HTMLInputElement>()
    protected main: any

    constructor(props: Props) {
        super(props)


        // this.lesson = props.lesson
        // this.userInput = React.createRef()

        // this.state = {
        //     proposition: this.lesson.getCurrent(),
        //     userAccuracy: 0,
        //     solutionHidden: true,
        //     overallUserAccuracy: 0,
        //     mode: Modes.STANDARD
        // }

        // this.lesson.getCurrent().play()
        this.props.c.getLesson().getCurrent().play()
        this.props.c.set('USER_ACCURACY', 0)
        this.props.c.set('SOLUTION_HIDDEN', true)
        this.props.c.set('OVERALL_USER_ACCURACY', 0)
        this.props.c.set('PLAY_MODE', Modes.STANDARD)

    }


    next = () => {

        if (this.props.c.get('SOLUTION_HIDDEN')) {
            this.props.c.set('USER_ACCURACY', this.props.c.getLesson().getCurrent().check(this.userInput.current?.value ?? ''))
            this.props.c.getLesson().getCurrent().targetToNative ? "" : this.props.c.getLesson().getCurrent().play()
        } else {
            this.props.c.getLesson().next();
            this.props.c.forceUpdate();
            (this.userInput.current as any).value = ""
            this.props.c.getLesson().getCurrent().play()
        }

        this.props.c.set('SOLUTION_HIDDEN', !this.props.c.get('SOLUTION_HIDDEN'))
        this.props.c.set('PLAY_MODE', this.props.c.getLesson().isOver(this.props.c) ? Modes.LESSON_OVER : this.props.c.get('PLAY_MODE'))
        this.props.c.set('OVERALL_USER_ACCURACY', this.props.c.getLesson().getScore())

    }

    render() {
        this.main = (<div>
            <h1>{this.props.c.L.translate_this_sentence}</h1>

            <div style={{ width: "50vw" }}>
                <div className="text_tip">{this.props.c.L.need_a_tip_hover_words}</div>
                <br />
                <HoverableSentence wordDict={this.props.c.getLesson().getCurrent().getQuestionWordDict()} />

                <button /* style={Styles.visibleInline} */
                    onClick={this.props.c.getLesson().getCurrent().play}
                    className="play_audio_button"
                    style={(this.props.c.getLesson().getCurrent().targetToNative && (this.props.c.get('PLAY_MODE') != Modes.LESSON_OVER)) ? Styles.visibleInline : Styles.invisible}
                    title={`${this.props.c.L.play_audio} (${this.props.c.L.shortcut_play_audio})`}>
                    <img src={PlayAudioIcon} />  </button>

                {/* <MenuButton  onClick={this.state.proposition.play} 
                             icon={Icon.Play} /> */}

            </div>

            <br />
            <InputManager userInput={this.userInput} proposition={this.props.c.getLesson().getCurrent()} />
            <br />
            <button onClick={this.next} className="normal_button">{this.props.c.get('SOLUTION_HIDDEN') ? this.props.c.L.see_solution : this.props.c.L.next}  </button>
            <br />
            <div style={this.props.c.get('SOLUTION_HIDDEN') ? Styles.invisible : Styles.visible}>
                <h1>{this.props.c.L.solution}:</h1>

                <div style={{ width: "50vw" }}>
                    <div className="text_tip">{this.props.c.L.need_a_tip_hover_words}</div>
                    <br />
                    <HoverableSentence wordDict={this.props.c.getLesson().getCurrent().getAnswerWordDict()} />
                    <button /* style={Styles.visibleInline} */ onClick={this.props.c.getLesson().getCurrent().play} className="play_audio_button" style={((!this.props.c.getLesson().getCurrent().targetToNative) && (this.props.c.get('PLAY_MODE') != Modes.LESSON_OVER)) ? Styles.visibleInline : Styles.invisible} title={`${this.props.c.L.play_audio} (${this.props.c.L.shortcut_play_audio})`}>   <img src={PlayAudioIcon} />  </button>
                </div>

                <h2>{this.props.c.L.your_accuracy}: {this.props.c.get('USER_ACCURACY')}%</h2>
            </div>
            <br />
            <span className="text_tip">{this.props.c.L.need_a_lot_of_tips} <button className="normal_link" onClick={() => { this.props.c.set('PLAY_MODE', Modes.EXPLANATION) }}>{this.props.c.L.read_explanation}</button></span>
        </div>)

        switch (this.props.c.get('PLAY_MODE')) {
            case Modes.STANDARD:
                return this.main;
            case Modes.EXPLANATION:
                return <Explanation explanationText={this.props.c.getLesson().getExplaination()} onBack={() => { this.props.c.set('PLAY_MODE', Modes.STANDARD) }} />
            case Modes.LESSON_OVER:
                return <LessonOver overallUserAccuracy={this.props.c.get('OVERALL_USER_ACCURACY')} />
        }

    }

    keyListener = (e: KeyboardEvent) => {
        //play recording if user allowed to hear it
        if (e.code == "Space" && e.shiftKey) {
            e.preventDefault();
            this.props.c.getLesson().getCurrent().play()
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyListener)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyListener)
    }

}