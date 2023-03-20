import React, { Component } from "react"
import HoverableWord from "./HoverableWord"

//@ts-ignore
import Styles from "../Styles.js"


export default class HoverableSentence extends Component<{ wordDict: string[][] }> {

    render() {
        return (<span style={Styles.visibleInline}>
            {this.props.wordDict.map((entry, index) => <HoverableWord word={entry[0]} definition={entry[1]} key={index} />)}
        </span>)
    }

}
