import React, {Component} from "react";
import L from "../../model/language.js";
import DefinitionsTable from "./definitions_table.jsx";


export default class Metadata extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return (<div>

            <h1>{L.metadata}</h1>
            <DefinitionsTable wordDict={this.props.metadataDict} onTableModified={ (newDict) => {  this.props.onModifyMetadata(newDict)   }} />

        </div>)
    }

}