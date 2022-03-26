import React, { Component } from "react";
import CraftLesson from "./craft_lesson/CraftLesson.jsx";
import TakeLesson from "./take_lesson/TakeLesson.jsx";
import Info from "./info/Info.jsx";
import Pages from "./Pages.js";
import { readText } from "../model/Utils.js";
import Lesson from "../model/Lesson"
import LessonBuilder from "../model/LessonBuilder.js";
import Settings from "./settings/Settings.jsx";
import L from "../model/Language.js";
import { playBase64 } from "../model/Recorder.js";
import "../index.css"
import HomeIcon from "../../res/home.png"
import SelectSound from "../../res/select.mp3"

export default class App extends Component {

    //pages which may contain unsaved data
    static sensitivePages = [Pages.CRAFT_NEW_LESSON, Pages.EDIT_LESSON]


    constructor(props) {
        super(props)

        this.menu = (<div>
            <button onClick={() => { this.onMenuChoose(Pages.TAKE_LESSON) }}  className="normal_button">{L.take_lesson}</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.CRAFT_NEW_LESSON) }} className="normal_button" >{L.craft_new_lesson}</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.EDIT_LESSON) }} className="normal_button" >{L.edit_lesson}</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.INFO) }} className="normal_button" >{L.info}</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.SETTINGS) }} className="normal_button" >{L.settings}</button>

        </div>)

        this.state = {
            page: this.menu,
            pageId: Pages.MENU
        }
    }

    render() {

        return (
            <div>
                <button onClick={() => { this.onMenuChoose(Pages.MENU) }}> <img src={HomeIcon} alt={L.home} title={L.home} />   </button>

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
                this.setState({page : <Settings/>})
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


}