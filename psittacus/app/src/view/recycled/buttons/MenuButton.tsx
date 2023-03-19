import React, { Component } from "react";

//@ts-ignore
import SelectSound from "../../../../res/select.mp3"
//@ts-ignore
import { playBase64 } from "../../../model/utilities/Recorder";

type Props = {
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

    // /**
    //  * 
    //  * @param {{
    //  * title : string, 
    //  * onClick : function, 
    //  * icon : string | object,
    //  * style : *,
    //  * highlight : boolean,
    //  * flippedX : boolean
    //  * }} props 
    //  */
    // constructor(props) {
    //     super(props)
    //     this.props = props
    // }

    onClick = () => {
        playBase64(SelectSound)
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