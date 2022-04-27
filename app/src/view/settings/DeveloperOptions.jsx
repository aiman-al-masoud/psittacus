import React, { Component } from "react";
import PropositionSchedulerBuilder from "../../model/lesson/proposition_scheduler/PropositionSchedulerBuilder.js";
import L from "../../model/utilities/Language.js";
import { readText } from "../../model/utilities/Utils.js";

export default class DeveloperOptions extends Component {
    
    addCustomPropositionScheduler = async ()=>{
        let sourceCode = await readText()
        PropositionSchedulerBuilder.addCustomScheduler(sourceCode)
        PropositionSchedulerBuilder.loadCustomSchedulers()
    }
    
    render(){
        return (<div>
            <button onClick={this.addCustomPropositionScheduler}>Add Custom Proposition Scheduler</button>

        </div>)
    }
}
