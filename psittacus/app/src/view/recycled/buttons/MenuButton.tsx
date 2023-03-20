import React, { Component } from "react";
import { Context } from "../../../model/context/Context";
import { playBase64 } from '../../../model/utilities/playBase64';

type Props = {
    c: Context,
    title: string,
    onClick: () => void,
    icon: any,
    style?: any,
    highlight?: boolean,
    flippedX?: boolean
}

/**
 * A rounded, transparent menu button.
 */
export default class MenuButton extends Component<Props> {

    onClick = () => {
        playBase64(this.props.c.sounds.SelectSound)
        this.props.onClick()
    }

    render() {

        const isString = typeof this.props.icon === 'string'

        if (!isString) {
            return <button onClick={this.onClick} className="transparent_button icon_button" title={this.props.title} style={{ ...this.props.style, background: this.props.highlight ? "red" : "transparent", transform: this.props.flippedX ? "scaleX(-1)" : "scale(1)" }}>{<this.props.icon size={56} />}</button>
        } else {
            return <button onClick={this.onClick} className="transparent_button" title={this.props.title} style={{ ...this.props.style, background: this.props.highlight ? "red" : "transparent", transform: this.props.flippedX ? "scaleX(-1)" : "scale(1)" }}> <img src={this.props.icon} /></button>
        }
    }

}