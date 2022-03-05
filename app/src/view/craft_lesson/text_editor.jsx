import React, { Component } from "react";

export default class TextEditor extends Component{

    constructor(props){
        super(props)
        this.textarea = React.createRef()
    }

    render(){
        return (<div>
            <p>Edit the Explaination:</p>
            <textarea ref={this.textarea} cols="30" rows="30"  onInput={()=>{this.props.onTextChange(this.textarea.current.value)}}  value={this.props.text}></textarea>
        </div>)
    }

}