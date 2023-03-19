import React, { Component } from "react";
import Settings from "./settings/Settings";
import { Context, getContext } from "../model/Context"
import History from "./history/History";
import MainMenu from "./MainMenu"
import Download from "./download/Download";
import Info from "./info/Info";
import * as Icon from 'react-feather';
import "../index.css"
import { getLessonBuilder } from "../model/lesson/LessonBuilder";
import CraftLesson from "./craft_lesson/CraftLesson";
import { getLesson, Lesson } from "../model/lesson/Lesson";
import TakeLesson from "./take_lesson/TakeLesson";

//@ts-ignore
import Pages from "./Pages.js";
//@ts-ignore
import { readText } from "../model/utilities/Utils.js";
//@ts-ignore
import MenuButton from "./recycled/buttons/MenuButton.jsx";


type Props = {}
type State = { c: Context }

export default class App extends Component<Props, State> {

    protected menu: any
    protected ref: any

    //--
    protected pagesHistoryStack: any[]
    protected baseHref: string
    protected currentHref: string
    //--

    //pages which may contain unsaved data
    static sensitivePages = [Pages.CRAFT_NEW_LESSON, Pages.EDIT_LESSON]

    myForceUpdate = () => {
        this.ref.current.forceUpdate()
        this.forceUpdate()
    }

    constructor(props: Props) {

        super(props)

        this.state = {
            c: getContext({ forceUpdate: this.myForceUpdate } as any),
        }

        this.ref = React.createRef()
        this.menu = <MainMenu c={this.state.c} onMenuChoose={this.onMenuChoose} ref={this.ref} />
        this.state.c.setCurrentPage({ page: this.menu, pageId: Pages.MENU })

        //--
        this.pagesHistoryStack = []
        this.baseHref = location.protocol + '//' + location.host + location.pathname
        this.currentHref = this.baseHref
        //--

    }

    render() {

        return (
            <div>
                <MenuButton onClick={() => { this.onMenuChoose(Pages.MENU) }} icon={Icon.Home} title={this.state.c.L.home} />
                {this.state.c.getCurrentPage().page}
            </div>
        )
    }

    /**
     * 
     * @param {string} option  from `Pages.js` enum
     */
    onMenuChoose = async (option: string, args?: { lesson: Lesson }) => {

        //alert user if exiting with potentially unsaved data.
        if (App.sensitivePages.includes(this.state.c.getCurrentPage().pageId)) {
            if (!confirm(this.state.c.L.your_work_may_be_lost)) {
                return
            }
        }

        //create new page
        let newPage;
        switch (option) {
            case Pages.TAKE_LESSON:
                {
                    const lez = args?.lesson ?? getLesson(await readText().then((res: any) => { return JSON.parse(res) })) //if lesson not already there, ask upload file
                    lez.setScheduler(this.state.c)
                    this.state.c.setLesson(lez)
                    newPage = <TakeLesson c={this.state.c} ref={this.ref} />
                    break
                }
            case Pages.CRAFT_NEW_LESSON:
                this.state.c.clearLessonBuilder()
                newPage = <CraftLesson c={this.state.c} ref={this.ref} />
                break
            case Pages.EDIT_LESSON:
                {
                    let lez = getLessonBuilder(await readText().then((res: any) => { return JSON.parse(res) }))
                    this.state.c.setLessonBuilder(lez)
                    newPage = <CraftLesson c={this.state.c} ref={this.ref} />
                    break
                }
            case Pages.INFO:
                newPage = <Info c={this.state.c} ref={this.ref} />
                break
            case Pages.MENU:
                newPage = this.menu
                break
            case Pages.SETTINGS:
                newPage = <Settings c={this.state.c} ref={this.ref} />
                break
            case Pages.HISTORY:
                newPage = <History c={this.state.c} takeLesson={this.takeLesson} ref={this.ref} />
                break
            case Pages.DOWNLOAD:
                newPage = <Download c={this.state.c} takeLesson={this.takeLesson} ref={this.ref} />
                break
        }

        // save state before changing
        this.pagesHistoryStack.push([this.state.c.getCurrentPage().pageId, this.state.c.getCurrentPage().page])

        // update state
        this.state.c.setCurrentPage({ page: newPage, pageId: option })
        this.forceUpdate()

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
                    this.state.c.setCurrentPage({ page: p[1], pageId: p[0] })
                    this.forceUpdate()
                }

            }

        }, 100);

        //alert user if exiting with potentially unsaved data.
        window.addEventListener('beforeunload', (e) => {
            if (App.sensitivePages.includes(this.state.c.getCurrentPage().pageId)) {
                e.returnValue = this.state.c.L.your_work_may_be_lost;
            }
        })

    }

    takeLesson = (lesson: Lesson) => {
        this.onMenuChoose(Pages.TAKE_LESSON, { lesson: lesson })
    }

}