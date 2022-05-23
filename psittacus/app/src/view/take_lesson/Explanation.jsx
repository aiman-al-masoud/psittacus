import React, { Component } from "react";
import DOMPurify from 'dompurify';
import L from "../../model/utilities/Language";

/**
 * Displays an html-based explanation.
 */
export default class Explanation extends Component {

    /**
     * 
     * @param {{
     * explanationText:string,
     * onBack: function
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (<div>
            <button onClick={this.props.onBack} className="normal_button">{L.back}</button>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( this.props.explanationText ) }}></div>
        </div>)
    }


}

