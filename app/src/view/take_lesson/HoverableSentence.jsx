import React, {Component} from "react";
import HoverableWord from "./HoverableWord.jsx";


export default class HoverableSentence extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return (<div>
            { Object.entries(this.props.wordDict).map((entry, index)=> {return <HoverableWord word={entry[0]}  definition={entry[1]}  key={index} />} )}
        </div>)
    }

}
