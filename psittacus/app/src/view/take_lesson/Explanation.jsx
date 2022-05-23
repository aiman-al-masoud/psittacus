import React, { Component } from "react";
import DOMPurify from 'dompurify';

export default class Explanation extends Component {

    /**
     * 
     * @param {{explanationText:string}} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (<div>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( this.props.explanationText ) }}></div>
        </div>)
    }


}

