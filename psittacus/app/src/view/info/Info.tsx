import React, { Component } from "react";
import { Context } from "../../model/context/Context.js";

type PropsType = {
    c: Context
}

export default class Info extends Component<PropsType, {}, {}>{

    constructor(props: PropsType) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>{this.props.c.L.welcome}</h1>
                <p>{this.props.c.L.to_use_app_offline}</p>

                <ul>
                    <li>{this.props.c.L.win_linux_save_offline}</li>
                    <li>{this.props.c.L.mac_save_offline}</li>
                </ul>



                <h1>{this.props.c.L.demo}</h1>
                <a href={this.props.c.L.demo_link} target="_blank">{this.props.c.L.demo_link}</a>


                <h1>{this.props.c.L.license}</h1>
                <p>{this.props.c.L.license_notice}</p>
                <h2>{this.props.c.L.full_terms}</h2>
                <a href={this.props.c.L.license_link} target="_blank">{this.props.c.L.license_link}</a>
                <h2>{this.props.c.L.link_to_source_code_title}</h2>
                <a href={this.props.c.L.link_to_source_code} target="_blank">{this.props.c.L.link_to_source_code}</a>
                <h2>{this.props.c.L.images_sounds}</h2>
                <a href={this.props.c.L.attribs_link} target="_blank">{this.props.c.L.images_sounds}</a>



                <h1>{this.props.c.L.bug_reports}</h1>
                <div className="text_tip">{this.props.c.L.bug_report_is}</div>
                <br />
                <a href={`mailto:${this.props.c.L.support_email}?subject=${this.props.c.L.psittacus_bug_report}&body=${"..."}`}>{this.props.c.L.support_email}</a>
                <h2>{this.props.c.L.file_issue}</h2>
                <div className="text_tip">{this.props.c.L.issue_is}</div>
                <a href="https://github.com/aiman-al-masoud/psittacus/issues" target="_blank">https://github.com/aiman-al-masoud/psittacus/issues</a>


                <h1>{this.props.c.L.shortcuts}</h1>

                <p>{this.props.c.L.tab_to_move}</p>

                <h2>{this.props.c.L.lesson_crafting}</h2>
                <ul>
                    <li><span>{this.props.c.L.shortcut_save_lesson}</span>: <span>{this.props.c.L.save_lesson}</span></li>
                    <li><span>{this.props.c.L.shortcut_record_audio}</span>: <span>{this.props.c.L.record}/{this.props.c.L.stop_recording}</span></li>
                    <li><span>{this.props.c.L.shortcut_play_audio}</span>: <span>{this.props.c.L.play_audio}</span></li>
                </ul>

                <h2>{this.props.c.L.take_lesson}</h2>
                <ul>
                    <li><span>{this.props.c.L.shortcut_play_audio}</span>: <span>{this.props.c.L.play_audio}</span></li>
                </ul>

            </div>
        )
    }
}