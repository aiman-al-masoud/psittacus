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


        this.pagesHistoryStack = [ ]
        this.baseHref = location.protocol + '//' + location.host + location.pathname
        this.currentHref = this.baseHref

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

        //create new page
        let newPage;
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

                    newPage = <TakeLesson lesson={lez} />
                    break
                }
            case Pages.CRAFT_NEW_LESSON:
                newPage = <CraftLesson />
                break
            case Pages.EDIT_LESSON:
                {
                    let jsonData = await readText().then((res) => { return JSON.parse(res) })
                    let lez = LessonBuilder.fromExistingJson(jsonData)
                    newPage = <CraftLesson lessonBuilder={lez} />
                    break
                }
            case Pages.INFO:
                newPage = <Info />
                break
            case Pages.MENU:
                newPage = this.menu
                break
            case Pages.SETTINGS:
                newPage = <Settings />
                break
            case Pages.HISTORY:
                newPage = <History takeLesson={this.takeLesson} /> 
                break
            case Pages.DOWNLOAD:
                newPage = <Download takeLesson={this.takeLesson} />
                break
        }

        // save state before changing
        this.pagesHistoryStack.push( [this.state.pageId, this.state.page] )
        
        // update state
        this.setState({ pageId: option, page : newPage })

        //update location
        location.href = this.baseHref+"#"+option
        this.currentHref = location.href

    }

    componentDidMount() {

        //alert user if exiting with potentially unsaved data.
        window.addEventListener('beforeunload', (e) => {
            if (App.sensitivePages.includes(this.state.pageId)) {
                e.returnValue = L.your_work_may_be_lost;
            }
        })

        //detect browser's back button
        setInterval(() => {
            
            if(this.currentHref!=location.href){
                
                this.currentHref = location.href
                let  p = this.pagesHistoryStack.pop()

                if(p){
                    this.setState({ pageId: p[0], page : p[1] })
                }

            }

        }, 100);


    }

    /**
     * 
     * @param {Lesson} lesson 
     */
    takeLesson = (lesson) => {
        this.onMenuChoose(Pages.TAKE_LESSON, {lesson : lesson })
    }

}