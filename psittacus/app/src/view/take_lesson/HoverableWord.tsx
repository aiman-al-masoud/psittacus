import React, { Component } from "react";
import Tooltip from "../recycled/tooltip/Tooltip";

type Props = {
    word: string,
    definition: string,
    key: number
}

export default class HoverableWord extends Component<Props, { hidden: boolean, x: number, y: number }> {

    constructor(props: Props) {
        super(props)

        this.state = {
            hidden: true,
            x: 0,
            y: 0
        }
    }

    render() {

        return (
            <span >
                <span onMouseLeave={this.toggleDefinition} onMouseEnter={this.toggleDefinition} onClick={this.toggleDefinition} style={{ color: this.state.hidden ? "black" : "orange", cursor: "default" }}   >{this.props.word} </span>

                <Tooltip hidden={this.state.hidden} title={this.props.word} body={this.props.definition} x={this.state.x} y={this.state.y} />

            </span>)
    }

    toggleDefinition = (e: any) => {
        let box = e.target.getBoundingClientRect()
        this.setState({ x: box.right, y: box.bottom })
        this.setState({ hidden: !this.state.hidden })
    }

}
