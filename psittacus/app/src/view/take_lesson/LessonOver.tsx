import React, { Component } from "react";
import { Context } from "../../model/Context";

export default class LessonOver extends Component<{ c: Context, overallUserAccuracy: number }> {

    render() {
        return (<div>
            <h1>{this.props.c.L.thank_you_for_taking_lesson}</h1>
            <h2>{this.props.c.L.overall_accuracy} {this.props.overallUserAccuracy}%</h2>
        </div>)
    }

}

