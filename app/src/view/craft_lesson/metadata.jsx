import React, {Component} from "react";
import DefinitionsTable from "./definitions_table.jsx";


export default class Metadata extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return (<div>

            <h1>Metadata</h1>
            <DefinitionsTable wordDict={this.props.metadataDict} onTableModified={ (newDict) => {  this.props.onModifyMetadata(newDict)   }} />

        </div>)
    }

}