import React from 'react';

function IPlatTextField(props){
    return(
        <input
            type={props.Type}
            placeholder={props.PlaceHolder}
            minLength={props.MinLength}
            maxLength={props.MaxLength}
            disabled={props.IsReadOnly}
            value={props.Value}

            style={{
                width:props.W,
                height:props.H,

                // backgroundColor: props.BgColor,
                backgroundColor:props.IsBgc ? props.BgColor : "#333640",

                fontSize:props.FontSize,
                display: props.Display,

                // paddingTop:"3px",
                // paddingDown:"3px",
                padding:"5px 10px",
                borderRadius: props.Radius ? props.Radius : "8px",

                color:"#cecece",

                outline: "none",
                boxShadow: "none",
                border:"none",
        }} onChange={props.HandleChange} onKeyPress={props.OnEnterKey} />
    );
}

export default IPlatTextField;
