import React, { Component } from "react";
import Styles from "../Styles";



export default class HoverableWord extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            hidden : true
        }

    }

    render() {
        
        return (
            <span>
                <span onMouseLeave={this.toggleDefinition}   onMouseEnter={this.toggleDefinition}  style={ {color : this.state.hidden?"black": "red"  , cursor:"default"  } }   >{this.props.word} </span>
                
                {/* <span style={{ ...this.state.hidden? Styles.invisible:Styles.visibleInline, color : "red" }}>{this.props.definition} </span> */}
                
                <div style={{ ...this.state.hidden? Styles.invisible:Styles.visibleInline, position:"absolute", top:"top", border:"solid 1px black", borderRadius:"10px", width : "20vw", padding:"1vw",          background :  "rgba(0, 0, 255, 0.9)", color:"white" }}>   <p style={{ textDecoration: "underline"  }} >{this.props.word}</p>   <p>{this.props.definition}</p> </div>


            </span>)
    }

    toggleDefinition = (e) => {
        console.log(e)
        this.setState({hidden: !this.state.hidden})
    }




}
