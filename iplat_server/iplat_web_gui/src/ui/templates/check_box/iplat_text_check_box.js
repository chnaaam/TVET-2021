import React from 'react';

import IPlatCheckBox from "../../component/check_box/iplat_check_box";
import {COLORS} from "../../component/resources/iplat_colors";

function IPlatTextCheckBox(props){
    return(
        <IPlatCheckBox
            Title={props.Title}
            Color={props.Color}/>
    );
}

export default IPlatTextCheckBox;
