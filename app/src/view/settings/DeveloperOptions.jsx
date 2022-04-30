import React, { Component } from "react";
import PropositionSchedulerFactory from "../../model/schedulers/proposition_scheduler/PropositionSchedulerFactory.js";
import L from "../../model/utilities/Language.js";
import S from "../../model/utilities/Settings.js";
import { readText, saveToComp } from "../../model/utilities/Utils.js";
import Styles from "../Styles.js";
import ClassLoader from "../../model/utilities/ClassLoader.js";
import LessonSchedulerFactory from "../../model/schedulers/lesson_scheduler/LessonSchedulerFactory.js";
import PropositionScheduler from "../../model/schedulers/proposition_scheduler/PropositionScheduler.js";
import LessonScheduler from "../../model/schedulers/lesson_scheduler/LessonScheduler.js";


export default class DeveloperOptions extends Component {

    constructor(props) {
        super(props)

        this.state = {
            DEV_OPTIONS_ENABLED: S.getInstance().get(S.DEV_OPTIONS_ENABLED),
            mouseOverEnableCheckbox: false
        }
    }

    toggle = () => {
        let s = !S.getInstance().get(S.DEV_OPTIONS_ENABLED)
        S.getInstance().set(S.DEV_OPTIONS_ENABLED, s)
        this.setState({ DEV_OPTIONS_ENABLED: s })
    }

    render() {

        return (<div>

            <h1>{"Developer Options"}</h1>

            <span>Enable:</span>
            <input onClick={this.toggle}
                onMouseEnter={() => { this.setState({ mouseOverEnableCheckbox: true }) }}
                onMouseLeave={() => { this.setState({ mouseOverEnableCheckbox: false }) }}
                type="checkbox" checked={this.state.DEV_OPTIONS_ENABLED} />

            <span className="text_warning" style={this.state.mouseOverEnableCheckbox ? Styles.visibleInline : Styles.invisible}>CAUTION: enabling developer options may expose you to SECURITY RISKS.</span>
           <br />

            <div style={this.state.DEV_OPTIONS_ENABLED ? Styles.visible : Styles.invisible}>
                <h2>Run custom code</h2>
                <div className="text_warning">Running code from untrusted sources is DANGEROUS: make sure you know what you're doing!</div>
                <br />
                <button onClick={async ()=>{PropositionSchedulerFactory.addCustomScheduler(await readText())}} className="normal_button">Add Custom Proposition Scheduler</button>
                <button onClick={()=>{  saveToComp( PropositionScheduler.getTemplate(), "my-propo-scheduler.js","text/plain")}}>Template</button>
                <br />
                <button onClick={async ()=>{LessonSchedulerFactory.addCustomScheduler(await readText())}} className="normal_button">Add Custom Lesson Scheduler</button>
                <button onClick={()=>{  saveToComp( LessonScheduler.getTemplate(), "my-lesson-scheduler.js","text/plain")}}>Template</button>
                <br />
                <br />
                <div className="text_tip">Click 'Reload' after adding custom code, or 'Remove All Custom Code' if you change your mind.</div>
                <button onClick={ClassLoader.removeAllCustomCode} className="safe_button">Remove All Custom Code</button>
                <br />
                <button onClick={()=>{window.location.reload()}} className="dangerous_button">Reload</button>
            </div>

        </div>)
    }
}
