import React, { Component } from "react";
import { Context } from "../../model/Context.js";
import { SettingsKeys } from "../../model/settings/Settings.js";
import DeveloperOptions from "./DeveloperOptions";
import { readText } from "../../model/utilities/readText";
import { saveToComp } from "../../model/utilities/saveToComp";

// @ts-ignore
// import LessonSchedulerFactory from "../../model/schedulers/lesson_scheduler/LessonSchedulerFactory.js";


export default class Settings extends Component<{ c: Context }> {

    onSet = (key: SettingsKeys, event: any) => {
        const choice = event.target
        const val = choice.options[choice.selectedIndex].text
        this.props.c.set(key as any, val as any)
    }

    importProgress = async () => {
        this.props.c.UP.importProgress(JSON.parse(await readText()))
    }

    exportProgress = () => {
        saveToComp(JSON.stringify(this.props.c.UP.userProgress()), 'progress.txt', 'text/plain')
    }

    eraseProgress = () => {
        confirm(this.props.c.L.are_you_sure_delete_progress) ? this.props.c.UP.eraseProgress() : undefined
    }

    render() {

        return (<div>

            <h1>{this.props.c.L.choose_lang}</h1>
            <select value={this.props.c.get('APP_LANGUAGE')} onChange={(event) => { this.onSet('APP_LANGUAGE', event) }} >
                {this.props.c.availableLangs.map((opt, index)=> <option title={opt} key={index}>{opt}</option> )}
            </select>

            <h1>{this.props.c.L.choose_proposition_scheduler}</h1>
            <div className="text_tip">{this.props.c.L.proposition_scheduler_is}</div>

            <select value={this.props.c.get('PROPOSITION_SCHEDULER')} onChange={(event) => { this.onSet('PROPOSITION_SCHEDULER', event) }} >
                {this.props.c.propoSchedFac.getTypes().map((opt, index) => <option title={opt} key={index}>{opt}</option> )}
            </select>

            <div className="text_tip">
                {this.props.c.propoSchedFac.describeCurrent()}
            </div>

            <h1>{this.props.c.L.choose_lesson_scheduler}</h1>
            <div className="text_tip">{this.props.c.L.lesson_scheduler_is}</div>

            <select value={this.props.c.get('LESSON_SCHEDULER')} onChange={(event) => { this.onSet('LESSON_SCHEDULER', event) }} >
                {this.props.c.lessonSchedFac.getTypes().map((opt, index) => <option title={opt} key={index}>{opt}</option> )}
            </select>

            <div className="text_tip">
                {this.props.c.lessonSchedFac.describeCurrent()}
            </div>

            <h1>{this.props.c.L.manage_data_about_your_progress}</h1>
            <div className="text_tip">{this.props.c.L.progress_is}</div>

            <button onClick={this.exportProgress} className="normal_button">{this.props.c.L.export_progress}</button>
            <button onClick={this.importProgress} className="normal_button">{this.props.c.L.import_progress}</button>
            <button onClick={this.eraseProgress} className="normal_button">{this.props.c.L.erase_progress}</button>

            <h1>Input Type</h1>

            <div className="text_tip">{this.props.c.L.input_type_is}</div>

            <select value={this.props.c.get('INPUT_TYPE')} onChange={event => { this.onSet('INPUT_TYPE', event) }} >
                {this.props.c.inputTypes.map((opt, index) => <option title={opt} key={index}>{opt}</option> )}
            </select>

            <br />
            <br />
            <DeveloperOptions c={this.props.c} />

        </div>)
    }

}
