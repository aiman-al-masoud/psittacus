import React, { Component } from "react"
import { Context } from "../model/Context"
import MainMenuButton from "./recycled/buttons/MainMenuButton"


export default class MainMenu extends Component<{ c: Context }> {

    render(): React.ReactNode {

        return (<div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
            <MainMenuButton c={this.props.c} title={this.props.c.L.info} icon={this.props.c.icons.Info} onClick={() => this.props.c.setPage('info')} />
            <MainMenuButton c={this.props.c} title={this.props.c.L.download_lessons} icon={this.props.c.icons.Download} onClick={() => this.props.c.setPage('download')} />
            <MainMenuButton c={this.props.c} title={this.props.c.L.take_lesson} icon={this.props.c.icons.BookOpen} onClick={() => this.props.c.setPage('open-lesson')} />
            <MainMenuButton c={this.props.c} title={this.props.c.L.history} icon={this.props.c.icons.RotateCcw} onClick={() => this.props.c.setPage('history')} />
            <MainMenuButton c={this.props.c} title={this.props.c.L.craft_new_lesson} icon={this.props.c.icons.FilePlus} onClick={() => this.props.c.setPage('craft-new-lesson')} />
            <MainMenuButton c={this.props.c} title={this.props.c.L.edit_lesson} icon={this.props.c.icons.Edit} onClick={() => this.props.c.setPage('edit-lesson')} />
            <MainMenuButton c={this.props.c} title={this.props.c.L.settings} icon={this.props.c.icons.Settings} onClick={() => this.props.c.setPage('settings')} />
        </div>)
    }

}