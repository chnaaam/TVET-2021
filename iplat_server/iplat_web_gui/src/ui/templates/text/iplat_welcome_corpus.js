import React from 'react';
import IPlatNomalCorpus from "../../component/text/iplat_normal_corpus";


function IPlatWelcomeCorpus(props){
    return(
        <IPlatNomalCorpus
            W={props.W}
            Title={props.Title}
            FontSize={props.FontSize}
            FontColor={props.FontColor}
        />
    );
}

export default IPlatWelcomeCorpus;
