import React, { Component } from "react";
import Settings from "./settings/Settings";
import { Context } from "../model/context/Context"
import History from "./history/History";
import MainMenu from "./MainMenu"
import Download from "./download/Download";
import Info from "./info/Info";
import "../index.css"
import CraftLesson from "./craft_lesson/CraftLesson";
import TakeLesson from "./take_lesson/TakeLesson";
import { Page, sensitivePages } from "../model/settings/Keys";
import MenuButton from "./recycled/buttons/MenuButton";


type Props = { c: Context }

export default class App extends Component<Props, {}> {

    protected ref: any

    myForceUpdate = () => {
        this.ref?.current?.forceUpdate?.()
        this.forceUpdate()
    }

    constructor(props: Props) {

        super(props)
        this.props.c.setForceUpdate(this.myForceUpdate)
        this.ref = React.createRef()
        this.props.c.setPage('menu')

    }

    render() {

        return (
            <div>
                <MenuButton c={this.props.c} onClick={() => this.props.c.setPage('menu')} icon={this.props.c.icons.Home} title={this.props.c.L.home} />
                {this.getPage(this.props.c.getPage())}
            </div>
        )
    }

    getPage = (option: Page): JSX.Element => {

        switch (option) {

            case 'take-lesson':
            case 'open-lesson':
                return <TakeLesson c={this.props.c} ref={this.ref} />
            case 'craft-new-lesson':
                return <CraftLesson c={this.props.c} ref={this.ref} />
            case 'edit-lesson':
                return <CraftLesson c={this.props.c} ref={this.ref} />
            case 'info':
                return <Info c={this.props.c} ref={this.ref} />
            case 'menu':
                return <MainMenu c={this.props.c} ref={this.ref} />
            case 'settings':
                return <Settings c={this.props.c} ref={this.ref} />
            case 'history':
                return <History c={this.props.c} ref={this.ref} />
            case 'download':
                return <Download c={this.props.c} ref={this.ref} />
        }

    }

    componentDidMount() {

        this.props.c.urlTracker.start()

        //alert user if exiting with potentially unsaved data. TODO: put also when leaving sensitive pages
        window.addEventListener('beforeunload', (e) => {
            if (sensitivePages.includes(this.props.c.getPage() as any)) {
                e.returnValue = this.props.c.L.your_work_may_be_lost;
            }
        })

    }

    componentWillUnmount(): void {
        this.props.c.urlTracker.stop()
    }
}