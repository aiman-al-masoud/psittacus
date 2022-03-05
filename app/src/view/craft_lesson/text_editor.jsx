import React, { Component } from "react";

export default class TextEditor extends Component{

    constructor(props){
        super(props)
        this.textarea = React.createRef()
    }

    render(){
        return (<div>
            <textarea ref={this.textarea} cols="100" rows="30"  onInput={()=>{this.props.onTextChange(this.textarea.current.value)}}  value={this.props.text}></textarea>
        </div>)
    }

}