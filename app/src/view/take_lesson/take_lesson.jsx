import React, { Component } from "react";
import HoverableSentence from "./hoverable_sentence.jsx";
import "../../index.css"
import L from  "../../model/language.js"


export default class TakeLesson extends Component {

    

    constructor(props) {
        super(props)

        this.lesson = props.lesson        
        this.userInput = React.createRef()

        this.state = {
            proposition: this.lesson.getCurrent(),
            userAccuracy: 0,
            solutionHidden : true
        }

        this.lesson.getCurrent().targetToNative?this.lesson.getCurrent().play():""
   
    }


    next = () => {
    
        if(this.state.solutionHidden){
            this.setState({ userAccuracy: this.state.proposition.check(this.userInput.current.value) })
            this.lesson.getCurrent().targetToNative?"":this.lesson.getCurrent().play()

        }else{
            this.lesson.next()
            this.setState({ proposition: this.lesson.getCurrent() })
            this.userInput.current.value = ""   
            this.lesson.getCurrent().targetToNative?this.lesson.getCurrent().play():""
        }

        this.setState({solutionHidden : !this.state.solutionHidden})
    }



    render() {
        return (

            <div>
                <h1>{L.translate_this_sentence}</h1>
                <br />
                
                <HoverableSentence wordDict={this.state.proposition.getQuestionWordDict()}  />

                <button onClick={this.state.proposition.play} className="normal_button"  style={{visibility : this.state.proposition.targetToNative?"visible":"hidden"  }} >{L.play_audio}</button>
                <br />
                <input ref={this.userInput} type="text" className="normal_textbox"/>
                <br />
                <button onClick={this.next} className="normal_button">{this.state.solutionHidden? L.see_solution : L.next }  </button>
                <br />

                <div style={{visibility : this.state.solutionHidden?"hidden":"visible" } }>
                    <h1>{L.solution}:</h1>
                    <HoverableSentence wordDict={this.state.proposition.getAnswerWordDict()}  />
                    <h2>{L.your_accuracy}: {this.state.userAccuracy}%</h2>
                </div>

            </div>

        )
    }


}