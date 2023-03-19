import React from "react";
import MenuButton from "./MenuButton";

/**
 * A rounded, transparent menu button with a title and meant to stay in a grid.
 */
export default class MainMenuButton extends MenuButton {

    render() {
        return (<div className="center_container">
            <div>
                {super.render()}
                <p className="mainmenu_title">{this.props.title}</p>
            </div>
        </div>)
    }

}