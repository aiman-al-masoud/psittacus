import React, { Component } from "react";
import { Context } from "../../model/context/Context.js";
import { readText } from "../../model/utilities/readText";
import { saveToComp } from "../../model/utilities/saveToComp";

//@ts-ignore
import Styles from "../Styles.js";
//@ts-ignore
import ClassLoader from "../../model/utilities/ClassLoader.js";

//@ts-ignore
// import LessonSchedulerFactory from "../../model/schedulers/lesson_scheduler/LessonSchedulerFactory.js";
//@ts-ignore
// import LessonScheduler from "../../model/schedulers/lesson_scheduler/LessonScheduler.js";



export default class DeveloperOptions extends Component<{ c: Context }> {

    toggle = () => {

        if (!this.props.c.get('DEV_OPTIONS_ENABLED')) { //if not enabled yet
            if (confirm(this.props.c.L.are_you_sure_enable_dev_options)) {
                this.props.c.set('DEV_OPTIONS_ENABLED', true)
            }
        } else { // disable dev options (safe mode)
            this.props.c.set('DEV_OPTIONS_ENABLED', false)
        }

    }

    render() {

        return (<div>

            <h1>{this.props.c.L.developer_options}</h1>

            <span>{this.props.c.L.enable}:</span>
            <input onClick={this.toggle}
                onMouseEnter={() => { this.setState({ mouseOverEnableCheckbox: true }) }}
                onMouseLeave={() => { this.setState({ mouseOverEnableCheckbox: false }) }}
                type="checkbox" checked={this.props.c.get('DEV_OPTIONS_ENABLED')} />

            {/* <span className="text_warning" style={this.state.mouseOverEnableCheckbox ? Styles.visibleInline : Styles.invisible}>{this.props.c.L.caution_enabling_developer_options}</span> */}

            <span className="text_warning" style={Styles.visibleInline}>{this.props.c.L.caution_enabling_developer_options}</span>

            <br />

            <div style={this.props.c.get('DEV_OPTIONS_ENABLED') ? Styles.visible : Styles.invisible}>
                <h2>{this.props.c.L.run_custom_code}</h2>
                <div className="text_warning">{this.props.c.L.caution_running_custom_code}</div>
                <br />
                <button onClick={async () => { this.props.c.propoSchedFac.add(await readText()) }} className="normal_button">{this.props.c.L.add_custom_proposition_scheduler}</button>
                <button onClick={() => { saveToComp(this.props.c.propoSchedFac.getTemplate(), "my-propo-scheduler.js", "text/plain") }}>{this.props.c.L.template}</button>
                <br />
                <button onClick={async () => { this.props.c.lessonSchedFac.add(await readText()) }} className="normal_button">{this.props.c.L.add_custom_lesson_scheduler}</button>
                <button onClick={() => { saveToComp( this.props.c.lessonSchedFac.getTemplate(), "my-lesson-scheduler.js", "text/plain") }}>{this.props.c.L.template}</button>
                <br />
                <br />
                <div className="text_tip">{this.props.c.L.click_reload_or_remove_custom_code}</div>
                <button onClick={ClassLoader.removeAllCustomCode} className="safe_button">{this.props.c.L.remove_all_custom_code}</button>
                <br />
                <button onClick={() => { window.location.reload() }} className="dangerous_button">{this.props.c.L.dev_options_reload}</button>
            </div>

        </div>)
    }
}
