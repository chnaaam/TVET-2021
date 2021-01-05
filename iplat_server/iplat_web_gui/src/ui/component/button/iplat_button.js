import React, {useState} from 'react';
import './css/iplat_button.css'

function IPlatButton(props){
    return(
        <button
            className={"btn"}
            style={{
            width:props.W,
            height:props.H,

            fontSize:props.FontSize,
            display: props.Display,

            lineHeight:props.H,

            borderRadius: props.IsNotRadius ? null : "8px",
            }}
                onClick={props.OnClick}
                onKeyPress={props.OnkeyPress}>
            {props.Title}
        </button>
    )
}

export default IPlatButton;
