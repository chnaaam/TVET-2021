import React from 'react';

function IPlatNormalButton(props) {

    const borderPro = "1px solid " + String(props.AllColor)
    return(
        <button style={{
            width:props.W,
            height:props.H,

            backgroundColor: "transparent",

            fontSize:props.FontSize,
            display: props.Display,


            paddingTop:props.IsNotpadidingTop ? "3px" : null,
            paddingDown:props.IsNotpadidingDown ? "3px" : null,


            borderRadius: props.IsNotRadius ? null : "8px",
            textAlign: "center",

            color: props.AllColor,
            border: borderPro,

            cursor: "pointer",
        }}
                // onMouseOver={(event => setBgc(props.BgHoverColor))}
                // onMouseLeave={(event => setBgc(props.BgColor))}
                // onKeyPress={props.OnkeyPress}
                onClick={props.OnClick}>
            {props.Title}
        </button>
    )
}

export default IPlatNormalButton;