import React, { Component } from "react";
import { Context } from "../model/Context";
import * as Icon from 'react-feather';
// @ts-ignore
import MainMenuButton from "./recycled/buttons/MainMenuButton.jsx";
// @ts-ignore
import Pages from "./Pages.js"


type Props = {
    c: Context,
    onMenuChoose: (option: any, args?: any) => void
}

export default class MainMenu extends Component<Props> {

    render(): React.ReactNode {

        return (<div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            <MainMenuButton title={this.props.c.L.info} icon={Icon.Info} onClick={() => { this.props.onMenuChoose(Pages.INFO) }} />
            <MainMenuButton title={this.props.c.L.download_lessons} icon={Icon.Download} onClick={() => { this.props.onMenuChoose(Pages.DOWNLOAD) }} />
            <MainMenuButton title={this.props.c.L.take_lesson} icon={Icon.BookOpen} onClick={() => { this.props.onMenuChoose(Pages.TAKE_LESSON) }} />
            <MainMenuButton title={this.props.c.L.history} icon={Icon.RotateCcw} onClick={() => { this.props.onMenuChoose(Pages.HISTORY) }} />
            <MainMenuButton title={this.props.c.L.craft_new_lesson} icon={Icon.FilePlus} onClick={() => { this.props.onMenuChoose(Pages.CRAFT_NEW_LESSON) }} />
            <MainMenuButton title={this.props.c.L.edit_lesson} icon={Icon.Edit} onClick={() => { this.props.onMenuChoose(Pages.EDIT_LESSON) }} />
            <MainMenuButton title={this.props.c.L.settings} icon={Icon.Settings} onClick={() => { this.props.onMenuChoose(Pages.SETTINGS) }} />
        </div>)
    }

}