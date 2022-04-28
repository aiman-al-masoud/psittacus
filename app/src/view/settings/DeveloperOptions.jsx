import React, { Component } from "react";
import PropositionSchedulerBuilder from "../../model/lesson/proposition_scheduler/PropositionSchedulerBuilder.js";
import L from "../../model/utilities/Language.js";
import { readText } from "../../model/utilities/Utils.js";
import Styles from "../Styles.js";

export default class DeveloperOptions extends Component {

    addCustomPropositionScheduler = async () => {
        let sourceCode = await readText()
        PropositionSchedulerBuilder.addCustomScheduler(sourceCode)
        PropositionSchedulerBuilder.loadCustomSchedulers()
    }

    render() {
        return (<div>

            <span>Enable:</span>
            <input type="checkbox" />

            <br />

            <h2>Load custom code</h2>
            <div className="text_tip">Running code from untrusted sources is DANGEROUS: make sure you know what you're doing!</div>

            <button onClick={this.addCustomPropositionScheduler}>Add Custom Proposition Scheduler</button>

        </div>)
    }
}
