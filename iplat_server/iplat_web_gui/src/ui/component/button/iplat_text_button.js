import React from 'react';
import './css/iplat_text_button.css';

function IPlatTextButton(props){

    return(
        <p className={"text-btn"}
            style={{
                width:props.W,
                display: props.Display,

                paddingLeft:"5px",
                paddingRight:"5px",
                // backgroundColor:"pink",

                color:"white",
                float:"left",
                textAlign: "center",
                cursor:"pointer",
                fontSize: props.FontSize ? props.FontSize :"13px",
            }}
            onClick={props.OnClick}
        >{props.Title}</p>
    )
}


export default IPlatTextButton;
