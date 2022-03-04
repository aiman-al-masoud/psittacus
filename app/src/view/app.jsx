import React, { Component } from "react";
import CraftLesson from "./craft_lesson/craft_lesson.jsx";
import TakeLesson from "./take_lesson/take_lesson.jsx";
import Info from "./info/info.jsx";
import Pages from "./pages.js";
import { readText } from "../model/utils.js";
import Lesson from "../model/lesson"
import LessonBuilder from "../model/lesson_builder.js";
import HomeIcon from "../../res/home.png"
import Settings from "./settings/settings.jsx";


export default class App extends Component {

    //pages which may contain unsaved data
    static sensitive_pages = [Pages.CRAFT_NEW_LESSON, Pages.EDIT_LESSON]


    constructor(props) {
        super(props)

        this.menu = (<div>
            <button onClick={() => { this.onMenuChoose(Pages.TAKE_LESSON) }}>Take Lesson</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.CRAFT_NEW_LESSON) }}>Craft New Lesson</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.EDIT_LESSON) }}>Edit Lesson</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.INFO) }}>Info</button>
            <br />
            <button onClick={() => { this.onMenuChoose(Pages.SETTINGS) }}>Settings</button>

        </div>)

        this.state = {
            page: this.menu,
            pageId: Pages.MENU
        }
    }

    render() {

        return (
            <div>
                <button onClick={() => { this.onMenuChoose(Pages.MENU) }}> <img src={HomeIcon} alt="home" title="home" />   </button>
                {this.state.page}
            </div>
        )
    }

    onMenuChoose = async (option) => {

        //alert user if exiting with potentially unsaved data.
        if (App.sensitive_pages.includes(this.state.pageId)) {
            if (!confirm("Your work may be lost. Ok?")) {
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
            if (App.sensitive_pages.includes(this.state.pageId)) {
                e.returnValue = 'Your work may be lost. Ok?';
            }
        })
    }


}