import React from "react";

function IPlatIconButton(props) {
    return(
        <img
            style={{
                width:props.W,
                height:props.H,

                display: props.Display,

                cursor: "pointer",

                // backgroundColor: 'pink'
            }}
        src={props.Img} onClick={props.OnClick}/>
    )
}

export default IPlatIconButton;
