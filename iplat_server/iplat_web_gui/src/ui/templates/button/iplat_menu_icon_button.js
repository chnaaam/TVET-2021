import React from 'react';

import IPlatIconButton from "../../component/button/iplat_icon_button";

function IPlatMenuIconButton(props){
    return(
        <IPlatIconButton
            Img={props.Img}
            W={props.W}
            H={props.H}
            Display={props.Display}

            OnClick={props.OnClick}
        />
    );
}

export default IPlatMenuIconButton;
