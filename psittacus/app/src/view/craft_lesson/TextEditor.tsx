import React, { Component } from "react";
import "../../index.css"
import { Context } from "../../model/context/Context";


/**
 * Used to edit the eplanation of a lesson.
 */
export default class TextEditor extends Component<{ c: Context, onTextChange: (x: string) => void, text: string }>{

    readonly textarea = React.createRef() as any

    render() {
        return (<div>
            <h1>{this.props.c.L.make_your_point}</h1>
            <div className="text_tip">{this.props.c.L.make_your_point_is}</div>
            <div className="text_tip">{this.props.c.L.use_html_tags}</div>
            <textarea ref={this.textarea} className="textarea" onInput={() => { this.props.onTextChange(this.textarea.current.value) }} value={this.props.text}></textarea>
        </div>)
    }

}