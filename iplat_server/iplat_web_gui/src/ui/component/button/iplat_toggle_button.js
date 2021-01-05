import React from 'react';
import './css/iplat_toggle_button.css'

function IPlatToggleButton(props) {

    return(
        <button
            className={"btn-toggle"}
            style={{
                width:props.W,
                height:props.H,

                fontSize:props.FontSize,
                display: props.Display,
                backgroundColor:props.BgColor,

                lineHeight:props.H,

                borderRadius: props.IsNotRadius ? null : "8px",
            }}
            onClick={props.OnClick}
            onKeyPress={props.OnkeyPress}>
            {props.Title}
        </button>

    )
}

export default IPlatToggleButton;
