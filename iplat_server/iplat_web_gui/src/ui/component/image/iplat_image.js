import React from "react";

function IPlatImage(props) {
    return(
        <img
            style={{
                width:props.W,
                height:props.H,
                padding: "3px 6px",
                display: props.Display,
            }}
            src={props.Img}
            onClick={props.OnClick}
        />
    )
}

export default IPlatImage;
