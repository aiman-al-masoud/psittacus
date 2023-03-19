import React, { Component } from "react";
import { Context } from "../model/Context";
import * as Icon from 'react-feather';
// @ts-ignore
import MainMenuButton from "./recycled/buttons/MainMenuButton.jsx";


export default class MainMenu extends Component<{ c: Context }> {

    render(): React.ReactNode {

        return (<div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            <MainMenuButton title={this.props.c.L.info} icon={Icon.Info} onClick={() => this.props.c.setPage('info')} />
            <MainMenuButton title={this.props.c.L.download_lessons} icon={Icon.Download} onClick={() => this.props.c.setPage('download')} />
            <MainMenuButton title={this.props.c.L.take_lesson} icon={Icon.BookOpen} onClick={() => this.props.c.setPage('open-lesson')} />
            <MainMenuButton title={this.props.c.L.history} icon={Icon.RotateCcw} onClick={() => this.props.c.setPage('history')} />
            <MainMenuButton title={this.props.c.L.craft_new_lesson} icon={Icon.FilePlus} onClick={() => this.props.c.setPage('craft-new-lesson')} />
            <MainMenuButton title={this.props.c.L.edit_lesson} icon={Icon.Edit} onClick={() => this.props.c.setPage('edit-lesson')} />
            <MainMenuButton title={this.props.c.L.settings} icon={Icon.Settings} onClick={() => this.props.c.setPage('settings')} />
        </div>)
    }

}