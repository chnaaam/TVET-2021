import React from 'react';

import IPlatTextButton from "../../component/button/iplat_text_button";

function IPlatDefaultTextButton(props){
    return(
        <IPlatTextButton
            Title={props.Title}
            FontColor={props.FontColor}
            Display={props.Display}
            OnClick={props.OnClick}
        />
    );
}

export default IPlatDefaultTextButton;
