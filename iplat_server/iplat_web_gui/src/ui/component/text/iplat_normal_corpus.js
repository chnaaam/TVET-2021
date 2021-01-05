import React from 'react';

function IPlatNomalCorpus(props) {

    return(
        <span style={{
            fontSize: props.FontSize,
            whiteSpace: "pre-line",
            color:props.FontColor
        }}>
            {String(props.Title).split("<br/>").map(i =>
                <span>{i}<br/></span>
            )}
        </span>
    )
}

export default IPlatNomalCorpus;
