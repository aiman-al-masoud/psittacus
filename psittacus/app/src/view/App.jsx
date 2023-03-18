import React, { Component } from "react";
import Settings from "./settings/Settings";
import { getContext } from "../model/Context"
import History from "./history/History";
import MainMenu from "./MainMenu"
import Download from "./download/Download";
import Info from "./info/Info";
import * as Icon from 'react-feather';
import "../index.css"
import { getLessonBuilder } from "../model/lesson/LessonBuilder";
import CraftLesson from "./craft_lesson/CraftLesson";
import Lesson, { getLesson } from "../model/lesson/Lesson";
import TakeLesson from "./take_lesson/TakeLesson.tsx";

import Pages from "./Pages.js";
import { readText } from "../model/utilities/Utils.js";
import MenuButton from "./recycled/buttons/MenuButton.jsx";


export default class App extends Component {

    //pages which may contain unsaved data
    static sensitivePages = [Pages.CRAFT_NEW_LESSON, Pages.EDIT_LESSON]

    myForceUpdate = () => {
        this.currentPage.current.forceUpdate()
        this.forceUpdate()
    }

    constructor(props) {

        super(props)
        const c = getContext({ forceUpdate: this.myForceUpdate })
        this.c = c
        this.currentPage = React.createRef()
        this.menu = <MainMenu c={c} onMenuChoose={this.onMenuChoose} ref={this.currentPage} />

        this.state = {
            pageId: Pages.MENU,
            c: this.c,
            page: this.menu
        }

        this.pagesHistoryStack = []
        this.baseHref = location.protocol + '//' + location.host + location.pathname
        this.currentHref = this.baseHref

    }

    render() {

        return (
            <div>
                <MenuButton onClick={() => { this.onMenuChoose(Pages.MENU) }} icon={Icon.Home} title={this.c.L.home} />
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
            if (!confirm(this.c.L.your_work_may_be_lost)) {
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
                    if (args?.lesson) {
                        lez = args.lesson
                    } else {
                        let data = await readText().then((res) => { return JSON.parse(res) })
                        lez = getLesson(data)
                    }

                    lez.setScheduler(this.state.c)
                    this.state.c.setLesson(lez)
                    newPage = <TakeLesson c={this.state.c} /* lesson={lez} */ ref={this.currentPage} />
                    break
                }
            case Pages.CRAFT_NEW_LESSON:
                this.state.c.clearLessonBuilder()
                newPage = <CraftLesson c={this.state.c} ref={this.currentPage} />
                break
            case Pages.EDIT_LESSON:
                {
                    let jsonData = await readText().then((res) => { return JSON.parse(res) })
                    let lez = getLessonBuilder(jsonData)
                    this.state.c.setLessonBuilder(lez)
                    newPage = <CraftLesson c={this.state.c} ref={this.currentPage} />
                    break
                }
            case Pages.INFO:
                newPage = <Info c={this.state.c} ref={this.currentPage} />
                break
            case Pages.MENU:
                newPage = this.menu
                break
            case Pages.SETTINGS:
                newPage = <Settings c={this.state.c} ref={this.currentPage} />
                break
            case Pages.HISTORY:
                newPage = <History c={this.state.c} takeLesson={this.takeLesson} ref={this.currentPage} />
                break
            case Pages.DOWNLOAD:
                newPage = <Download c={this.state.c} takeLesson={this.takeLesson} ref={this.currentPage} />
                break
        }

        // save state before changing
        this.pagesHistoryStack.push([this.state.pageId, this.state.page])

        // update state
        this.setState({ pageId: option, page: newPage })

        //update location
        location.href = this.baseHref + "#" + option
        this.currentHref = location.href

    }

    componentDidMount() {

        //"shake off" any (incompatible) query string parameters from other websites
        if (location.href.includes("?")) {
            location.href = this.baseHref
        }

        //detect browser's back button
        setInterval(() => {

            if (this.currentHref != location.href) {

                this.currentHref = location.href
                let p = this.pagesHistoryStack.pop()

                if (p) {
                    this.setState({ pageId: p[0], page: p[1] })
                }

            }

        }, 100);

        //alert user if exiting with potentially unsaved data.
        window.addEventListener('beforeunload', (e) => {
            if (App.sensitivePages.includes(this.state.pageId)) {
                e.returnValue = this.c.L.your_work_may_be_lost;
            }
        })

    }

    /**
     * 
     * @param {Lesson} lesson 
     */
    takeLesson = (lesson) => {
        this.onMenuChoose(Pages.TAKE_LESSON, { lesson: lesson })
    }

}