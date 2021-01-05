import React from 'react';

import IPlatTextField from "../../component/text_field/iplat_text_field";

function IPlatInputField(props){
    return(
        <IPlatTextField
            Type={props.Type}
            PlaceHolder={props.PlaceHolder}
            MaxLength={props.MaxLength}
            MinLength={props.MinLength}
            Display={props.Display}
            IsReadOnly={props.IsReadOnly}

            IsBgc={props.IsBgc}

            W={props.W}
            H={props.H}
            Color={props.Color}
            BgColor={props.BgColor}
            FontSize={props.FontSize}

            Radius={props.Radius}
            // Border={props.Border}


            HandleChange={props.HandleChange}
            OnEnterKey={props.OnEnterKey}
        />
    );
}

export default IPlatInputField;


//type={props.Type}
//             placeholder={props.PlaceHolder}
//             minLength={props.MinLength}
//             maxLength={props.MaxLength}
//             required={!props.IsReadOnly ? "enabled" : "disabled"}
//             disabled={props.IsReadOnly ? "disabled" : "enabled"}
//
//             style={{
//                 width:props.W,
//                 height:props.H,
//
//                 backgroundColor: props.BgColor,
//
//                 fontSize:props.FontSize,
//                 display: props.Display,
//
//                 paddingTop:"3px",
//                 paddingDown:"3px",
//
//                 borderRadius: "8px",
//
//                 color: "white",
//                 border: "none",
