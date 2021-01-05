import React from 'react';

function IPlatWarningText(props){
    return(
        <span style={{
            fontSize:props.FontSize,
            color:"red",
        }}>
            {props.Title}
        </span>
    );
}

export default IPlatWarningText;
