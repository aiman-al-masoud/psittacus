import React, { Component } from "react";
import "../../index.css"
import L from "../../model/language";


/**
 * Used to edit the eplanation of a lesson.
 */
export default class TextEditor extends Component{

    constructor(props){
        super(props)
        this.textarea = React.createRef()
    }

    render(){
        return (<div>
              <h1>{L.make_your_point}</h1>
                <div className="text_tip">{L.make_your_point_is}</div>
                <div className="text_tip">{L.use_html_tags}</div>
            <textarea ref={this.textarea} className="textarea"  onInput={()=>{this.props.onTextChange(this.textarea.current.value)}}  value={this.props.text}></textarea>
        </div>)
    }

}