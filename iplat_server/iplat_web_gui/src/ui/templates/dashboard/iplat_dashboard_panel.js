import React from 'react';

import IPLAT_LINE_GRAPH from "../../component/resources/imgs/IPLAT_LINE.png";
import IPLAT_DONUT_GRAPH from "../../component/resources/imgs/IPLAT_DONUT.png";
import IPLAT_TEXT from "../../component/resources/imgs/IPLAT_TEXT.png";
import IPLAT_DATA_STREAM_LOG from "../../component/resources/imgs/IPLAT_DATA_STREAM_LOG.png";

import IPlatPanelItem from "../../component/dashboard_items/iplat_panel_item";
import IPlatStateText from "../text/iplat_state_text";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatInfoTable from "../table/iplat_info_table";
import IPlatMonitoringPanel from "../table/iplat_monitoring_panel";
import IPlatPanel from "../table/iplat_panel";
import IPlatComponentList from "./iplat_component_list";
import IPlatDashboardWidget from "./iplat_dashboard_widget";

function IPlatDashboardPanel(props){
    // const IconButtonSize = "48px"

    return (
        <div style={{
            width: "250px",
            height: "inherit",
            display:"inline-block",

            backgroundColor: "#212329",
        }}>
            <div style={{
                height: "inherit",
                // backgroundColor: "yellow",
                marginTop:"15px",
            }}>
                <ul className={"left-list-body"}>
                    <li>
                        <IPlatComponentList
                            Title={"Device List"}
                            FontSize={"12px"}
                            FontColor={COLORS.GOLD_TEXT}
                            W={"100%"}
                            H={150}
                            Header={["Device Name"]}
                            isVisualbe={true}
                            Data={props.deviceList.names}
                            Value={props.deviceList.ids}
                            Weight={[1]}
                            OnClickNew={props.OnClickDeviceNew}
                            OnItemClick={props.OnDeviceItemClick}
                            OnClickDel={props.OnClickDeviceDelete}/>
                    </li>
                    <li>
                        <IPlatComponentList
                            Title={"Sensor List"}
                            FontSize={"12px"}
                            FontColor={COLORS.GOLD_TEXT}
                            W={"100%"}
                            H={150}
                            Header={["Sensor Name"]}
                            isVisualbe={true}
                            Data={props.sensorList.names}
                            Value={props.sensorList.ids}
                            Weight={[1]}
                            OnClickNew={props.OnClickSensorNew}
                            OnItemClick={props.OnSensorItemClick}
                            OnClickDel={props.OnClickSensorDelete}
                        />
                    </li>
                    <li>
                        <IPlatComponentList
                            Title={"Data List"}
                            FontSize={"12px"}
                            FontColor={COLORS.GOLD_TEXT}
                            W={"100%"}
                            H={150}
                            Header={["Start Time"]}
                            Data={props.dataList.names}
                            Value={props.dataList.ids}
                            Weight={[1, 1]}
                            OnItemClick={props.OnDataItemClick}
                        />
                    </li>
                    <li>
                        <IPlatDashboardWidget
                            Title={"Widgets"}
                            FontSize={"12px"}
                            FontColor={COLORS.GOLD_TEXT}
                            W={"100%"}
                            H={300}
                            OnClick={props.OnClick}
                        />
                    </li>
                </ul>
            </div>

            {/*<div style={{*/}
            {/*    height: "300px",*/}
            {/*    color:"gold",*/}
            {/*    fontWeight:"bold",*/}
            {/*    marginLeft:"15px",*/}
            {/*}}>*/}
            {/*    <div>*/}
            {/*        Widgets*/}
            {/*    </div>*/}
            {/*    <div style={{*/}
            {/*        marginTop:"10px"*/}
            {/*    }}>*/}
            {/*        <IPlatPanelItem W={IconButtonSize} H={IconButtonSize} value={'graph'} Img={IPLAT_LINE_GRAPH} OnClick={props.OnClick} />*/}
            {/*        <IPlatPanelItem W={IconButtonSize} H={IconButtonSize} value={'data-viewer-one-line'} Img={IPLAT_DATA_STREAM_LOG} OnClick={props.OnClick} />*/}
            {/*        <IPlatPanelItem W={IconButtonSize} H={IconButtonSize} value={'graph'} Img={IPLAT_LINE_GRAPH} OnClick={props.OnClick} />*/}
            {/*        <IPlatPanelItem W={IconButtonSize} H={IconButtonSize} value={'graph'} Img={IPLAT_DONUT_GRAPH} OnClick={props.OnClick} />*/}
            {/*    </div>*/}
            {/*</div>*/}


        </div>
    )
}

export default IPlatDashboardPanel;
