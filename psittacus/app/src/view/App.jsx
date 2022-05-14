import React, { Component } from "react";
import CraftLesson from "./craft_lesson/CraftLesson.jsx";
import TakeLesson from "./take_lesson/TakeLesson.jsx";
import Info from "./info/Info.jsx";
import Pages from "./Pages.js";
import { readText } from "../model/utilities/Utils.js";
import Lesson from "../model/lesson/Lesson.js";
import LessonBuilder from "../model/lesson/LessonBuilder.js";
import Settings from "./settings/Settings.jsx";
import L from "../model/utilities/Language.js";
import { playBase64 } from "../model/utilities/Recorder.js";
import "../index.css"
import HomeIcon from "../../res/home.png"
import SelectSound from "../../res/select.mp3"
import History from "./history/History.jsx";

import TakeLessonIcon from "../../res/take-lesson.png"
import CreateLessonIcon from "../../res/create-lesson.png"
import EditLessonIcon from "../../res/edit-lesson.png"
import SettingsIcon from "../../res/settings.png"
import InfoIcon from "../../res/info.png"
import HistoryIcon from "../../res/history.png"



export default class App extends Component {

    //pages which may contain unsaved data
    static sensitivePages = [Pages.CRAFT_NEW_LESSON, Pages.EDIT_LESSON]

    constructor(props) {
        super(props)

        this.menu = (<div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>

            <div className="center_container">
                <div>
                    <button onClick={() => { this.onMenuChoose(Pages.TAKE_LESSON) }} className="transparent_button" title={L.take_lesson}> <img src={TakeLessonIcon} />  </button>
                    <p>{L.take_lesson}</p>
                </div>
            </div>

            <div className="center_container">
                <div>
                    <button onClick={() => { this.onMenuChoose(Pages.HISTORY) }} className="transparent_button" title={L.history} > <img src={HistoryIcon} /> </button>
                    <p>{L.history}</p>
                </div>
            </div>

            <div className="center_container">
                <div>
                    <button onClick={() => { this.onMenuChoose(Pages.CRAFT_NEW_LESSON) }} className="transparent_button" title={L.craft_new_lesson} > <img src={CreateLessonIcon} /> </button>
                    <p>{L.craft_new_lesson}</p>
                </div>
            </div>

            <div className="center_container">
                <div>
                    <button onClick={() => { this.onMenuChoose(Pages.EDIT_LESSON) }} className="transparent_button" title={L.edit_lesson}> <img src={EditLessonIcon} /> </button>
                    <p>{L.edit_lesson}</p>
                </div>
            </div>

            <div className="center_container">
                <div>
                    <button onClick={() => { this.onMenuChoose(Pages.INFO) }} className="transparent_button" title={L.info}> <img src={InfoIcon} /> </button>
                    <p>{L.info}</p>
                </div>
            </div>

            <div className="center_container">
                <div>
                    <button onClick={() => { this.onMenuChoose(Pages.SETTINGS) }} className="transparent_button" title={L.settings}> <img src={SettingsIcon} /> </button>
                    <p>{L.settings}</p>
                </div>
            </div>

        </div>)

        this.state = {
            page: this.menu,
            pageId: Pages.MENU
        }
    }

    render() {

        return (
            <div>
                <button onClick={() => { this.onMenuChoose(Pages.MENU) }} className="transparent_button" alt={L.home} title={L.home} > <img src={HomeIcon} /> </button>

                {this.state.page}
            </div>
        )
    }

    onMenuChoose = async (option) => {

        //play select button sound
        playBase64(SelectSound)

        //alert user if exiting with potentially unsaved data.
        if (App.sensitivePages.includes(this.state.pageId)) {
            if (!confirm(L.your_work_may_be_lost)) {
                return
            }
        }

        switch (option) {
            case Pages.TAKE_LESSON:
                {
                    let jsonData = await readText().then((res) => { return JSON.parse(res) })
                    let lez = new Lesson(jsonData)
                    this.setState({ page: <TakeLesson lesson={lez} /> })
                    break
                }
            case Pages.CRAFT_NEW_LESSON:
                this.setState({ page: <CraftLesson /> })
                break
            case Pages.EDIT_LESSON:
                {
                    let jsonData = await readText().then((res) => { return JSON.parse(res) })
                    let lez = LessonBuilder.fromExistingJson(jsonData)
                    this.setState({ page: <CraftLesson lessonBuilder={lez} /> })
                    break
                }
            case Pages.INFO:
                this.setState({ page: <Info /> })
                break
            case Pages.MENU:
                this.setState({ page: this.menu })
                break
            case Pages.SETTINGS:
                this.setState({ page: <Settings /> })
                break
            case Pages.HISTORY:
                this.setState({ page: <History takeLesson={this.takeLesson} /> })
                break
        }

        this.setState({ pageId: option })

    }

    //alert user if exiting with potentially unsaved data.
    componentDidMount() {
        window.addEventListener('beforeunload', (e) => {
            if (App.sensitivePages.includes(this.state.pageId)) {
                e.returnValue = L.your_work_may_be_lost;
            }
        })
    }

    takeLesson = (lesson) => {
        this.setState({ page: <TakeLesson lesson={lesson} /> })
        this.setState({ pageId: Pages.TAKE_LESSON })
    }


}