import React from 'react';

function IPlatBorder(props) {

    const borderPro = "1px solid " + String(props.AllColor)
    return(
        <div style={{
            width:props.W,
            height:props.H,

            backgroundColor: "transparent",

            fontSize:props.FontSize,
            display: props.Display,
            lineHeight:"15px",

            // paddingTop:props.IsNotpadidingTop ? "2px" : null,
            paddingDown:props.IsNotpadidingDown ? "3px" : null,


            borderRadius: props.IsNotRadius ? null : "8px",
            textAlign: "center",

            color: props.AllColor,
            border: borderPro,

        }}
            // onMouseOver={(event => setBgc(props.BgHoverColor))}
            // onMouseLeave={(event => setBgc(props.BgColor))}
            // onKeyPress={props.OnkeyPress}
                onClick={props.OnClick}>
            {props.Title}
        </div>
    )
}

export default IPlatBorder;
