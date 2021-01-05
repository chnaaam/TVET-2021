import React from 'react';

import IPLAT_LOGO from '../../component/resources/imgs/IPLAT_LOGO.png';

import IPlatImage from "../../component/image/iplat_image";

function IPlatIconTextLogo(props){
    return(
        <IPlatImage
            Img={IPLAT_LOGO}
            W={props.W}
            H={props.H}
            Display={props.Display}
            OnClick={props.OnClick}
        />
    );
}

export default IPlatIconTextLogo;
