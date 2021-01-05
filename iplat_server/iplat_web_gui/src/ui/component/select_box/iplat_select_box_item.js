import React from 'react';

function IPlatSelectBoxItem(props) {

    return(
        <option
            style={{
                fontSize: props.FontSize,

                paddingTop:"50px",
                paddingBottom:"50px",
                paddingLeft:"30px",

                lineHeight:"25px",

                cursor: "pointer",
            }}
            onClick={props.onClick}>
            {props.Title}
        </option>
    )
}

export default IPlatSelectBoxItem;