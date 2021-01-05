import React from 'react';
import './css/iplat_component_list.css';

import IPlatBoldCorpus from "../../component/text/iplat_bold_corpus";
import IPlatTextButton from "../../component/button/iplat_text_button";
import IPlatTable from "../../component/table/iplat_table";

import {COLORS} from "../../component/resources/iplat_colors";

function IPlatComponentList(props) {
    const CalItemH = String(Number(props.H)- Number("30"))+"px"

    return(
        <div className={"panel-body"}>
            <div className={"panel-container"} >
                <h1 style={{
                    backgroundColor:COLORS.TABLE_BACKGROUND
                }}>
                    <IPlatBoldCorpus
                        Title={props.Title}
                        FontSize={props.FontSize}
                        FontColor={props.FontColor}
                    />
                </h1>
            </div>

            <div style={{
                height:CalItemH,
                backgroundColor:COLORS.TABLE_BACKGROUND
            }}   className={"list-item-area"}>
                {
                    <IPlatTable
                        H={CalItemH}
                        Header={props.Header}
                        Data={props.Data}
                        Value={props.Value}
                        Weight={props.Weight}
                        OnItemClick={props.OnItemClick}
                        // StartIdxZero={props.StartIdxZero}
                    />
                }
            </div>
        </div>
    )
}

export default IPlatComponentList;
