import React, { Component } from "react";
import Styles from "../Styles";



export default class HoverableWord extends Component {

    constructor(props) {
        super(props)

        this.toolTip  = React.createRef()
        
        this.state = {
            hidden : true
        }

    }

    render() {
        
        return (
            <span >
                <span onMouseLeave={this.toggleDefinition}   onMouseEnter={this.toggleDefinition}   onClick={this.toggleDefinition} style={ {color : this.state.hidden?"black": "orange"  , cursor:"default"  } }   >{this.props.word} </span>
                                
                <div ref={this.toolTip} className="hovering_tool_tip" style={{ ...this.state.hidden? Styles.invisible:Styles.visibleInline     }}>   <h1>{this.props.word}</h1>     <p>{this.props.definition}</p>    </div>

            </span>)
    }

    toggleDefinition = (e) => {
        // console.log()
        console.log(e)
        // this.setState({coords: [e.clientX , e.clientY ]})

        let tt = this.toolTip.current
        console.log(tt)

        this.setState({hidden: !this.state.hidden})
    }




}
