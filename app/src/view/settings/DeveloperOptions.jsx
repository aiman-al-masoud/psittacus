import React, { Component } from "react";
import PropositionSchedulerBuilder from "../../model/lesson/proposition_scheduler/PropositionSchedulerBuilder.js";
import L from "../../model/utilities/Language.js";
import S from "../../model/utilities/Settings.js";
import { readText } from "../../model/utilities/Utils.js";
import Styles from "../Styles.js";
import ClassLoader from "../../model/utilities/ClassLoader.js";


export default class DeveloperOptions extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            DEV_OPTIONS_ENABLED: S.getInstance().get(S.DEV_OPTIONS_ENABLED)
        }
    }

    addCustomPropositionScheduler = async () => {
        let sourceCode = await readText()
        PropositionSchedulerBuilder.addCustomScheduler(sourceCode)
        PropositionSchedulerBuilder.loadCustomSchedulers()
    }

    toggle = () => {
        let s = !S.getInstance().get(S.DEV_OPTIONS_ENABLED)
        S.getInstance().set(S.DEV_OPTIONS_ENABLED, s)
        this.setState({ DEV_OPTIONS_ENABLED: s })
    }

    render() {
        return (<div>

            <span>Enable:</span>
            <input onClick={this.toggle} type="checkbox" checked={this.state.DEV_OPTIONS_ENABLED} />
            <br />

            <div style={this.state.DEV_OPTIONS_ENABLED? Styles.visible : Styles.invisible}>
                <h2>Run custom code</h2>
                <div className="text_tip">Running code from untrusted sources is DANGEROUS: make sure you know what you're doing!</div>
                <button onClick={this.addCustomPropositionScheduler}>Add Custom Proposition Scheduler</button>


                <button onClick={()=>{ClassLoader.removeAllCustomCode()}}>REMOVE ALL CUSTOM CODE</button>
            </div>

        </div>)
    }
}
