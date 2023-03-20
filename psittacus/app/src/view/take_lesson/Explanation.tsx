import React, { Component } from "react";
import DOMPurify from 'dompurify'
import { Context } from "../../model/context/Context";


/**
 * Displays an html-based explanation.
 */
export default class Explanation extends Component<{ c: Context, explanationText: string, onBack: () => void }> {

    render() {
        return (<div>
            <button onClick={this.props.onBack} className="normal_button">{this.props.c.L.back}</button>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.props.explanationText) }}></div>
        </div>)
    }

}

