import React, {useState} from 'react';
import './css/iplat_monitoring_panel.css';

import {COLORS} from "../../component/resources/iplat_colors";
import IPlatBoldTitle from "../../component/text/iplat_bold_title";
import IPlatTableInfoItem from "../../component/table/iplat_table_info_item";

import IPlatTextButton from "../../component/button/iplat_text_button";
import IPlatButton from "../../component/button/iplat_button";
import IPlatInputField from "../text_field/iplat_input_field";


function IPlatMonitoringPanel(props) {

    const CalItemHs = String(Number(props.H)- Number("30"))+"px"
    const [isSelected, setIsSelected] = useState(true)


    return(
        <div style={{width:props.W}}>
            <div className={"monitoring-panel-header"} >
                <h1 style={{backgroundColor:COLORS.TABLE_BACKGROUND}}>
                    <IPlatBoldTitle
                        Title={props.Title}
                        FontSize={props.FontSize}
                        FontColor={props.FontColor}
                    />
                </h1>
            </div>


            <div className={"monitoring-panel-content"} style={{backgroundColor:COLORS.TABLE_BACKGROUND}}>
                <ul>
                    <li>
                        {
                            props.Data && props.Value ? props.Data.map((d, i) => {
                                return <IPlatTableInfoItem
                                    W={props.W}
                                    H={"23px"}
                                    Index={i}
                                    Data={props.Data[i]}

                                    // Value={props.IsState ? (props.IsState=="on"? "on": "off")  : props.Value[i]}
                                    // OnItemClick={(e) => {
                                    //     setIsSelected(true)
                                    //     props.OnItemClick()
                                    // }}
                                    // OnItemClickColorChange = {isSelected}
                                />
                            }) : null
                        }
                    </li>
                    <li className={"content-item1"}>
                        <div className={"start-stop-button-area"}>
                            <span>
                                Monitorting
                            </span>

                            <div className={"start-button"}>
                                <button style={{
                                    backgroundColor: props.isToggleMonitoringStart ? COLORS.GOLD_TEXT : COLORS.TABLE_ITEM_CLICK,
                                    color: props.isToggleMonitoringStart ? "black" : "white"
                                }}
                                        onClick={props.OnClickMonitoringStart}>
                                    START
                                </button>

                            </div>

                            <div className={"stop-button"}>
                                <button
                                    style={{
                                        backgroundColor: props.isToggleMonitoringStop ? COLORS.GOLD_TEXT : COLORS.TABLE_ITEM_CLICK,
                                        color: props.isToggleMonitoringStop ? "black" : "white"
                                    }}
                                    onClick={props.OnClickMonitoringStop}>
                                    STOP
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default IPlatMonitoringPanel;
