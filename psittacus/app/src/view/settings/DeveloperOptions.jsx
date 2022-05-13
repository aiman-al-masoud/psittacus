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

            <h1>{L.developer_options}</h1>

            <span>{L.enable}:</span>
            <input onClick={this.toggle}
                onMouseEnter={() => { this.setState({ mouseOverEnableCheckbox: true }) }}
                onMouseLeave={() => { this.setState({ mouseOverEnableCheckbox: false }) }}
                type="checkbox" checked={this.state.DEV_OPTIONS_ENABLED} />

            <span className="text_warning" style={this.state.mouseOverEnableCheckbox ? Styles.visibleInline : Styles.invisible}>{L.caution_enabling_developer_options}</span>
           <br />

            <div style={this.state.DEV_OPTIONS_ENABLED ? Styles.visible : Styles.invisible}>
                <h2>{L.run_custom_code}</h2>
                <div className="text_warning">{L.caution_running_custom_code}</div>
                <br />
                <button onClick={async ()=>{PropositionSchedulerFactory.addCustomScheduler(await readText())}} className="normal_button">{L.add_custom_proposition_scheduler}</button>
                <button onClick={()=>{  saveToComp( PropositionScheduler.getTemplate(), "my-propo-scheduler.js","text/plain")}}>{L.template}</button>
                <br />
                <button onClick={async ()=>{LessonSchedulerFactory.addCustomScheduler(await readText())}} className="normal_button">{L.add_custom_lesson_scheduler}</button>
                <button onClick={()=>{  saveToComp( LessonScheduler.getTemplate(), "my-lesson-scheduler.js","text/plain")}}>{L.template}</button>
                <br />
                <br />
                <div className="text_tip">{L.click_reload_or_remove_custom_code}</div>
                <button onClick={ClassLoader.removeAllCustomCode} className="safe_button">{L.remove_all_custom_code}</button>
                <br />
                <button onClick={()=>{window.location.reload()}} className="dangerous_button">{L.dev_options_reload}</button>
            </div>

        </div>)
    }
}
