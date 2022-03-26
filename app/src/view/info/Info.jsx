import React, { Component } from "react";
import L from "../../model/Language.js";



export default class Info extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>{L.welcome}</h1>
                <p>{L.to_use_app_offline}</p>
                <p>{L.win_linux_save_offline}</p>
                <p>{L.mac_save_offline}</p>

                <h1>{L.demo}</h1>
                <a href={L.demo_link} target="_blank">{L.demo_link}</a>

                <h1>{L.link_to_source_code_title}</h1>
                <a href={L.link_to_source_code} target="_blank">{L.link_to_source_code}</a>

                <h1>{L.license}</h1>
                <p>{L.license_notice}</p>
                <h1>{L.full_terms}</h1>
                <a href={L.license_link} target="_blank">{L.license_link}</a>

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