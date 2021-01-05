import React from 'react';
import './css/iplat_panel.css';

import IPlatBoldCorpus from "../../component/text/iplat_bold_corpus";
import IPlatTextButton from "../../component/button/iplat_text_button";
import IPlatTable from "../../component/table/iplat_table";

import {COLORS} from "../../component/resources/iplat_colors";

function IPlatPanel(props) {
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

                <div className={"text-button-area"}>
                    <ul style={{width:"150px"}}>
                        {
                            props.isVisualbeNEW ?
                                <li className={"text-button-new"}>
                                    <IPlatTextButton
                                        Title={"NEW"}
                                        OnClick={props.OnClickNew}
                                    />
                                </li>
                                :
                                null
                        }
                        {
                            props.isVisualbeDOWNLOAD ?
                                <li className={"text-button-down"}>
                                    <IPlatTextButton
                                        Title={"SAVE"}
                                        OnClick={props.OnClickDownloadData}
                                    />
                                </li>
                                :
                                null
                        }
                        <li>
                            <IPlatTextButton
                                Title={"DEL"}
                                OnClick={props.OnClickDel}
                            />
                        </li>
                    </ul>
                </div>
            </div>

            <div style={{
                height:CalItemH,
                backgroundColor:COLORS.TABLE_BACKGROUND
            }}   className={"list-item-area"}>
                {
                    // console.log("DIV: ", props.isAlives)
                    <IPlatTable
                        H={CalItemH}
                        Header={props.Header}
                        Data={props.Data}
                        Value={props.Value}
                        isAlives={props.isAlives}
                        Weight={props.Weight}
                        OnItemClick={props.OnItemClick}
                        // StartIdxZero={props.StartIdxZero}
                    />
                }
            </div>
        </div>
    )
}

export default IPlatPanel;
