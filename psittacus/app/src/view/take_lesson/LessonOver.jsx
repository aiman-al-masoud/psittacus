import React, { Component } from "react";
import L from "../../model/utilities/Language";

export default class LessonOver extends Component {

    /**
     * 
     * @param {{overallUserAccuracy:number}} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (<div>
            <h1>{L.thank_you_for_taking_lesson}</h1>
            <h2>{L.overall_accuracy} {this.props.overallUserAccuracy}%</h2>
        </div>)
    }


}

