import React, {Component} from "react";
import HoverableWord from "./hoverable_word.jsx";


export default class HoverableSentence extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return (<div>
            { Object.entries(this.props.wordDict).map((entry)=> {return <HoverableWord word={entry[0]}  definition={entry[1]} />} )}
        </div>)
    }

}
