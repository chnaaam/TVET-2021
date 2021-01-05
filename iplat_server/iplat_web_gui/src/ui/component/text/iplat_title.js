import React from 'react';

function IPlatTitle(props) {

    return(
        <span style={{
            display:"block",
            fontSize:props.FontSize,
            color:props.FontColor,
            letterSpacing:"-0.01em"
        }}>
            {props.Title}
        </span>

    )
}

export default IPlatTitle;


// {String(props.Title).split("<br/>").map(i =>
//     <li style={{
//         display:"block",
//         fontSize:props.FontSize,
//         color:props.FontColor,
//     }}>{i}
//     </li>
// )}
