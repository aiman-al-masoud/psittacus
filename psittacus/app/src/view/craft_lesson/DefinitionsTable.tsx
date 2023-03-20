import React, { Component } from "react";
import { WordDict } from "../../model/proposition/PropositionBuilder";

type Props = {
    wordDict: WordDict,
    onTableModified: (x: any) => void
}

export default class DefinitionsTable extends Component<Props, {}>{

    protected table = React.createRef() as any

    render() {

        return (
            <table ref={this.table} onInput={() => { this.props.onTableModified(this.defintionTableToDict()) }}>
                {Object.entries(this.props.wordDict).map((entry, index) => <tr key={index}><td><input type="text" value={entry[0]} readOnly /></td><td><input type="text" value={entry[1]} /></td></tr> )}
            </table>
        )
    }


    defintionTableToDict = () => {
        var d = {} as any

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
