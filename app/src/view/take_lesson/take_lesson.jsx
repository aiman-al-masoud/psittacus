import React, { Component } from "react";
import HoverableSentence from "./hoverable_sentence.jsx";
import "../../index.css"
import L from "../../model/language.js"
import Modes from "./modes.js";


export default class TakeLesson extends Component {



    constructor(props) {
        super(props)

        this.lesson = props.lesson
        this.userInput = React.createRef()

        this.state = {
            proposition: this.lesson.getCurrent(),
            userAccuracy: 0,
            solutionHidden: true,
            overallUserAccuracy: 0,
            mode: Modes.STANDARD
        }

        this.lesson.getCurrent().targetToNative ? this.lesson.getCurrent().play() : ""

    }


    next = () => {

        if (this.state.solutionHidden) {
            this.setState({ userAccuracy: this.state.proposition.check(this.userInput.current.value) })
            this.lesson.getCurrent().targetToNative ? "" : this.lesson.getCurrent().play()

        } else {
            this.lesson.next()
            this.setState({ proposition: this.lesson.getCurrent() })
            this.userInput.current.value = ""
            this.lesson.getCurrent().targetToNative ? this.lesson.getCurrent().play() : ""
        }

        this.setState({ solutionHidden: !this.state.solutionHidden })
        this.setState({mode :  this.lesson.isOver()? Modes.LESSON_OVER : this.state.mode })
        this.setState({ overallUserAccuracy: this.lesson.getScore() })

    }



    render() {

        let invisible = { display: "none", visibility: "hidden" }
        let visible = { display: "block", visibility: "visible" }


        return (<div>

            <div style={this.state.mode == Modes.STANDARD ? visible : invisible}>
                

                <h1>{L.translate_this_sentence}</h1>
                <div className="text_tip">{L.need_a_tip_hover_words}</div>
                

             
                <br />

                <HoverableSentence wordDict={this.state.proposition.getQuestionWordDict()} />

                <br />

                <button onClick={this.state.proposition.play} className="normal_button" style={{ visibility: this.state.proposition.targetToNative && (!this.state.mode==Modes.LESSON_OVER) ? "visible" : "hidden" }} >{L.play_audio}</button>
                <br />
                <input ref={this.userInput} type="text" className="normal_textbox" />
                <br />
                <button onClick={this.next} className="normal_button">{this.state.solutionHidden ? L.see_solution : L.next}  </button>
                <br />

                <div style={{ visibility: this.state.solutionHidden ? "hidden" : "visible" }}>
                    <h1>{L.solution}:</h1>
                    <div className="text_tip">{L.need_a_tip_hover_words}</div>
                    <HoverableSentence wordDict={this.state.proposition.getAnswerWordDict()} />
                    <h2>{L.your_accuracy}: {this.state.userAccuracy}%</h2>
                </div>

                <br />

                <div className="text_tip">{L.need_a_lot_of_tips} <a href="js:this.setState({mode: Modes.EXPLANATION})" onClick={()=>{this.setState({mode: Modes.EXPLANATION})}}>{L.read_explanation}</a></div>
                

            </div>

            <div style={this.state.mode == Modes.LESSON_OVER ? visible : invisible}   >
                <h1>{L.thank_you_for_taking_lesson}</h1>
                <h2>{L.overall_accuracy} {this.state.overallUserAccuracy}%</h2>
            </div>


            <div style={this.state.mode == Modes.EXPLANATION ? visible : invisible}   >
                <button onClick={()=>{this.setState({mode: Modes.STANDARD})}} className="normal_button">{L.back}</button>
                <div> <pre> {this.lesson.explanationText}</pre></div>
            </div>
            



        </div>)
    }


}