import React from 'react';

function IPlatContent(props) {

    return(
        <p style={{
            display: props.Display,

            color:props.FontColor,
            fontSize:"13px",
        }}>{props.Title}</p>
    )
}

export default IPlatContent;
