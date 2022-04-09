import React, { Component } from "react";

export default class DefinitionsTable extends Component{

    constructor(props){
        super(props)
        this.table = React.createRef()
    }

    render(){

        return (
            <table ref={this.table} onInput={ ()=>{this.props.onTableModified(this.defintionTableToDict())} }>
               {Object.entries(this.props.wordDict).map((entry, index)=> {return  <tr key={index}><td><input type="text" value={entry[0]}/></td><td><input type="text" value={entry[1]}/></td></tr>})}
            </table>
        )
    }


    defintionTableToDict = () => {
        var d = {}
        for (let row of this.table.current.rows) {
            try {
                let word = row.cells[0].children[0].value
                let definition = row.cells[1].children[0].value
                d[word] = definition
            } catch { }
        }
        return d
    }


}
