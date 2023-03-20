import React, { Component } from "react";
import { Context } from "../../model/Context.js";
import { Metadata } from "../../model/lesson/LessonBuilder.js";
import DefinitionsTable from "./DefinitionsTable";

export default class MetadataTable extends Component<{ c: Context, metadataDict: Metadata, onModifyMetadata: (x: any) => void }>{

    render() {
        return (<div>

            <h1>{this.props.c.L.metadata}</h1>
            <div className="text_tip">{this.props.c.L.make_sure_title_is_unique}</div>
            <DefinitionsTable wordDict={this.props.metadataDict as any} onTableModified={(newDict) => { this.props.onModifyMetadata(newDict) }} />

        </div>)
    }

}