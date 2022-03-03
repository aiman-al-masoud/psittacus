import React, { Component } from "react";

export default class Info extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Welcome to Psittacus!</h1>
                <p>To use this app offline, just save it as a .html.</p>
                <p>Windows/Linux: Ctrl + S</p>
                <p>Mac: ⌘ + S</p>

                <h1>Link to the source-code:</h1>
                <a href="https://github.com/aiman-al-masoud/psittacus" target="_blank">https://github.com/aiman-al-masoud/psittacus</a>

                <p>Psittacus is free software, licensed under GNU GPLv3.</p>

            </div>


        )
    }
}