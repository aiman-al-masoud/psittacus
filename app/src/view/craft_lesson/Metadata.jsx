import React, {Component} from "react";
import L from "../../model/utilities/Language.js";
import DefinitionsTable from "./DefinitionsTable.jsx";


export default class Metadata extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return (<div>

            <h1>{L.metadata}</h1>
            <div className="text_tip">{L.make_sure_title_is_unique}</div>
            <DefinitionsTable wordDict={this.props.metadataDict} onTableModified={ (newDict) => {  this.props.onModifyMetadata(newDict)   }} />

        </div>)
    }

}