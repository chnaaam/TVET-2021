import React from 'react';

import IPLAT_LOGO from '../../component/resources/imgs/IPLAT_SMALL_IOGO.png';

import IPlatImage from "../../component/image/iplat_image";

function IPlatSmallIconTextLogo(props){
    return(
        <IPlatImage
            Img={IPLAT_LOGO}
            W={props.W}
            H={props.H}
            Display={props.Display}/>
    );
}

export default IPlatSmallIconTextLogo;
