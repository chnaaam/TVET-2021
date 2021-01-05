import React from 'react';

function IPlatBoldCorpus(props) {

    return(
        <span style={{
            color:props.FontColor,
            fontSize:props.FontSize
        }}>
            {props.Title}
        </span>
    )
}

export default IPlatBoldCorpus;
