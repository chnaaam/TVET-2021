import React from 'react';

import IPlatButton from "../../component/button/iplat_button";

function IPlatDefaultButton(props){
    return(
        <IPlatButton
            Title={props.Title}
            W={props.W}
            H={props.H}
            BgColor={props.BgColor}
            BgHoverColor={props.BgHoverColor}
            Display={props.Display}
            FontSize={props.FontSize}

            OnClick={props.OnClick}
        />
    );
}

export default IPlatDefaultButton;
