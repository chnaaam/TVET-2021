import React from "react";
import IPlatNormalButton from "../../component/button/iplat_normal_button";


function IPlatStateButton(props) {

    return(
        <IPlatNormalButton
            Title={props.Title}

            W={props.W}
            H={props.H}
            AllColor={props.AllColor}

            FontSize={props.FontSize}
            Display={props.Display}

            IsNotpadidingTop={props.IsNotpadidingTop}
            IsNotRadius={props.IsNotRadius}

            // OnClick={props.OnClick}
        />
    )
}

export default IPlatStateButton;