import React, { Component } from "react";
import L from "../../model/utilities/Language.js";
import { sendBugReport } from "../../model/utilities/Utils.js";



export default class Info extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>{L.welcome}</h1>
                <p>{L.to_use_app_offline}</p>

                <ul>
                    <li>{L.win_linux_save_offline}</li>
                    <li>{L.mac_save_offline}</li>
                </ul>



                <h1>{L.demo}</h1>
                <a href={L.demo_link} target="_blank">{L.demo_link}</a>


                <h1>{L.license}</h1>
                <p>{L.license_notice}</p>
                <h2>{L.full_terms}</h2>
                <a href={L.license_link} target="_blank">{L.license_link}</a>
                <h2>{L.link_to_source_code_title}</h2>
                <a href={L.link_to_source_code} target="_blank">{L.link_to_source_code}</a>
                <h2>{L.images_sounds}</h2>
                <a href={L.attribs_link} target="_blank">{L.images_sounds}</a>



                <h1>{L.bug_reports}</h1>
                <div className="text_tip">{L.bug_report_is}</div>
                <br />
                <a href={`mailto:${L.support_email}?subject=${L.psittacus_bug_report}&body=${"..."}`}>{L.support_email}</a>
                <h2>{L.file_issue}</h2>
                <div className="text_tip">{L.issue_is}</div>
                <a href="https://github.com/aiman-al-masoud/psittacus/issues" target="_blank">https://github.com/aiman-al-masoud/psittacus/issues</a>


                <h1>{L.shortcuts}</h1>

                <p>{L.tab_to_move}</p>

                <h2>{L.lesson_crafting}</h2>
                <ul>
                    <li><span>{L.shortcut_save_lesson}</span>: <span>{L.save_lesson}</span></li>
                    <li><span>{L.shortcut_record_audio}</span>: <span>{L.record}/{L.stop_recording}</span></li>
                    <li><span>{L.shortcut_play_audio}</span>: <span>{L.play_audio}</span></li>
                </ul>

                <h2>{L.take_lesson}</h2>
                <ul>
                    <li><span>{L.shortcut_play_audio}</span>: <span>{L.play_audio}</span></li>
                </ul>



            </div>


        )
    }
}