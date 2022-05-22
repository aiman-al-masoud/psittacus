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
import Download from "./download/Download.jsx";
import "../index.css"
import HomeIcon from "../../res/home.png"
import History from "./history/History.jsx";
import TakeLessonIcon from "../../res/take-lesson.png"
import CreateLessonIcon from "../../res/create-lesson.png"
import EditLessonIcon from "../../res/edit-lesson.png"
import SettingsIcon from "../../res/settings.png"
import InfoIcon from "../../res/info.png"
import HistoryIcon from "../../res/history.png"
import DownloadIcon from "../../res/download.png"
import MainMenuButton from "./recycled/buttons/MainMenuButton.jsx";
import MenuButton from "./recycled/buttons/MenuButton.jsx";


export default class App extends Component {

    //pages which may contain unsaved data
    static sensitivePages = [Pages.CRAFT_NEW_LESSON, Pages.EDIT_LESSON]

    constructor(props) {
        super(props)

        this.menu = (<div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>

            <MainMenuButton title={L.info} icon={InfoIcon} onClick={() => { this.onMenuChoose(Pages.INFO) }}/>
            <MainMenuButton title={L.download_lessons} icon={DownloadIcon} onClick={() => { this.onMenuChoose(Pages.DOWNLOAD) }}/>
            <MainMenuButton title={L.take_lesson} icon={TakeLessonIcon} onClick={() => { this.onMenuChoose(Pages.TAKE_LESSON) }}/>
            <MainMenuButton title={L.history} icon={HistoryIcon} onClick={() => { this.onMenuChoose(Pages.HISTORY) }}/>
            <MainMenuButton title={L.craft_new_lesson} icon={CreateLessonIcon} onClick={() => { this.onMenuChoose(Pages.CRAFT_NEW_LESSON) }}/>
            <MainMenuButton title={L.edit_lesson} icon={EditLessonIcon} onClick={() => { this.onMenuChoose(Pages.EDIT_LESSON) }}/>
            <MainMenuButton title={L.settings} icon={SettingsIcon} onClick={() => { this.onMenuChoose(Pages.SETTINGS) }}/>

        </div>)

        this.state = {
            page: this.menu,
            pageId: Pages.MENU
        }
    }

    render() {

        return (
            <div>
                <MenuButton onClick={() => { this.onMenuChoose(Pages.MENU) }}  icon={HomeIcon}  title={L.home} />
                {this.state.page}
            </div>
        )
    }

    /**
     * 
     * @param {string} option  from Pages.js enum
     * @param {{lesson:Lesson?}} args 
     * @returns 
     */
    onMenuChoose = async (option, args) => {

        //alert user if exiting with potentially unsaved data.
        if (App.sensitivePages.includes(this.state.pageId)) {
            if (!confirm(L.your_work_may_be_lost)) {
                return
            }
        }

        switch (option) {
            case Pages.TAKE_LESSON:
                {
                    //if lesson not already supplied, ask used to upload lesson file
                    let lez;
                    if(args?.lesson){
                        lez = args.lesson
                    }else{
                        let jsonData = await readText().then((res) => { return JSON.parse(res) })
                        lez = new Lesson(jsonData)    
                    }

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
            case Pages.DOWNLOAD:
                this.setState({ page: <Download takeLesson={this.takeLesson} /> })
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

    /**
     * 
     * @param {Lesson} lesson 
     */
    takeLesson = (lesson) => {
        this.onMenuChoose(Pages.TAKE_LESSON, {lesson : lesson })
    }

}