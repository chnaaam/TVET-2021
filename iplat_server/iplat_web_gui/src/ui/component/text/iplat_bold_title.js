import React from "react";

function IPlatBoldTitle(props) {

    return(
        <span style={{
            color:props.FontColor,
            fontSize:props.FontSize,
            fontWeight:"bold",
            letterSpacing:"-0.01em",
        }}>
            {props.Title}
        </span>
    )
}

export default IPlatBoldTitle;
