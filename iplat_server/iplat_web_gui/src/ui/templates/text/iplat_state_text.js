import React from "react";
import IPlatBorder from "../../component/text/iplat_border";

function IPlatStateText(props) {

    return(
        <IPlatBorder
            Title={props.Title}

            W={props.W}
            H={props.H}
            AllColor={props.AllColor}

            FontSize={props.FontSize}
            Display={props.Display}

            IsNotpadidingTop={props.IsNotpadidingTop}
            IsNotRadius={props.IsNotRadius}
            Display={props.Display}
            // OnClick={props.OnClick}
        />
    )
}

export default IPlatStateText;