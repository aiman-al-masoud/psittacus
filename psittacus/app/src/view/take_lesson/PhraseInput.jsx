import React, { Component } from "react";
import Styles from "../Styles";
import Tooltip from "../recycled/tooltip/Tooltip.jsx";



export default class PhraseInput extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <input ref={this.props.userInput} type="text" className="normal_textbox" />
        )
    }

}
