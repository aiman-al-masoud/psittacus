import React, { Component } from "react";
import Styles from "../../Styles.js";

/**
 * A hovering tooltip.
 */
export default class Tooltip extends Component {

    /**
     * 
     * @param {{x:number, y:number, title:string, body:string}} props 
     */
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span className="hovering_tool_tip" style={{ left: this.props.x, top: this.props.y, ...(this.props.hidden ? Styles.invisible : Styles.visible) }}>
                <h1>{this.props.title}</h1>
                <p>{this.props.body}</p>
            </span>
        )
    }
}