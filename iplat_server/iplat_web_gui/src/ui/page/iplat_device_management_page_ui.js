import React from 'react';
import {Redirect} from 'react-router-dom';
import './css/iplat_device_management_page.css';

import IPlatNavigation from "../templates/nav_bar/iplat_navigation";

import {COLORS} from "../component/resources/iplat_colors";
import IPlatPanel from "../templates/table/iplat_panel";
import IPlatDeviceRegisterPopup from "../templates/dialog/iplat_device_register_popup";
import IPlatSensorRegisterPopup from "../templates/dialog/iplat_sensor_register_popup";
import IPlatInfoTable from "../templates/table/iplat_info_table";
import IPlatGraphTable from "../templates/table/iplat_graph_table";
import IPlatMonitoringPanel from "../templates/table/iplat_monitoring_panel";
import IPlatStateText from "../templates/text/iplat_state_text";
import IPlatDeviceEditPopup from "../templates/dialog/iplat_device_edit_popup";
import IPlatSensorEditPopup from "../templates/dialog/iplat_sensor_edit_popup";
import SAMPLE_IEG_LOGO from "../component/resources/imgs/SAMPLE_IEG_LOGO.png";

const MONITORING_NA = -1
const MONITORING_START = 0
const MONITORING_STOP = 1
const MONITORING_READY = 2

function IPlatDeviceManagementPageUI(props){
    // Debugging BackgroundColor
    const debug = false

    // 기본적인 스타일
    const defaultMargin = "15"
    const defaultFontSize = "12px"
    const smallFontSize = "10px"

    // 전체 영역
    //   - 모든 컴포넌트를 가지고 있는 촤상위 영역
    const rootGridMarginTop = "30px"
    const rootGridWidth = "1270px"
    const rootGridHeight = "700px"

    // List 패널 관련
    const listPanelGridWidth = "200px"
    const listPanelGridHeight = "100%"
    const deviceSensorListPanelHeight = "145"
    const fileListPanelHeight = "380"
    const panelTitleList = ["Device List", "Sensor List", "Data List"]

    // Information & Graph & Text 영역
    const InfoGraphTextPanelGridWidth = "1055px"
    const InfoGraphTextPanelGridHeight = "100%"

    // Information 영역
    const InfoTitleList = ["Device Information", "Sensor Information", "Real-Time Monitoring"]
    const IsStateON = true
    const oneInfoWidth = "341px"
    const twoInfoWidth = "341px"
    const threeInfoWidth = "343px"
    const InfoGridHeight = "250"

    // Graph & Text 영역
    const GraphGridWidth = InfoGraphTextPanelGridWidth
    const GraphGridHeight="450" - defaultMargin

    return(
        <div>
            <IPlatNavigation UserID={props.user.id} ClickLogout={props.clickLogout} ClickEnable={props.isMonitoringStart}/>

            <div className={"device-management-body"}>
                <div className={"left-list-container"}>
                    <ul className={"left-list-body"}>
                        <li>

                            <IPlatPanel
                                Title={"Device List"}
                                FontSize={defaultFontSize}
                                FontColor={COLORS.GOLD_TEXT}
                                W={"100%"}
                                H={deviceSensorListPanelHeight}
                                Header={["Device Name"]}
                                isVisualbeNEW={true}
                                Data={props.deviceList.names}
                                Value={props.deviceList.ids}
                                isAlives={props.deviceList.isAlives}
                                Weight={[1]}
                                OnClickNew={props.OnClickDeviceNew}
                                OnItemClick={props.OnDeviceItemClick}
                                OnClickDel={props.OnClickDeviceDelete}
                            />
                        </li>
                        <li>
                            <IPlatPanel
                                Title={"Sensor List"}
                                FontSize={defaultFontSize}
                                FontColor={COLORS.GOLD_TEXT}
                                W={"100%"}
                                H={deviceSensorListPanelHeight}
                                Header={["Sensor Name"]}
                                isVisualbeNEW={true}
                                Data={props.sensorList.names}
                                Value={props.sensorList.ids}
                                isAlives={props.sensorList.isAlives}
                                Weight={[1]}
                                OnClickNew={props.OnClickSensorNew}
                                OnItemClick={props.OnSensorItemClick}
                                OnClickDel={props.OnClickSensorDelete}
                            />
                        </li>
                        <li>
                            <IPlatPanel
                                Title={"Data List"}
                                FontSize={defaultFontSize}
                                FontColor={COLORS.GOLD_TEXT}
                                W={"100%"}
                                H={fileListPanelHeight}
                                Header={["Start Time"]}
                                isVisualbeDOWNLOAD={true}
                                Data={props.DATA_LIST}
                                Value={props.DATA_LIST}
                                Weight={[1, 1]}
                                OnItemClick={props.OnDataItemClick}
                                OnClickDownloadData={props.OnClickDownloadData}
                                OnClickDel={props.OnClickDataDelete}
                            />
                        </li>
                    </ul>

                    <div className={"right-container"}>
                        <ul>
                            <li>
                                {/*state 들어가는 곳*/}
                                <div className={"right-container device-state"}>
                                    {/*<IPlatStateText*/}
                                    {/*    Display={props.isAliveDevice == true ? "block" : "none"}*/}
                                    {/*    W={"45px"}*/}
                                    {/*    H={"17px"}*/}
                                    {/*    Title={"ON"}*/}
                                    {/*    FontSize={smallFontSize}*/}
                                    {/*    AllColor={COLORS.STATE_ON}*/}
                                    {/*    IsNotRadius*/}
                                    {/*/>*/}
                                    {/*<IPlatStateText*/}
                                    {/*    Display={props.isAliveDevice == true ? "none" : "block"}*/}
                                    {/*    W={"45px"}*/}
                                    {/*    H={"17px"}*/}
                                    {/*    Title={"OFF"}*/}
                                    {/*    FontSize={smallFontSize}*/}
                                    {/*    AllColor={COLORS.STATE_OFF}*/}
                                    {/*    IsNotRadius*/}
                                    {/*/>*/}
                                </div>
                                <IPlatInfoTable
                                    Title={"Device Information"}
                                    FontColor={COLORS.GOLD_TEXT}
                                    FontSize={defaultFontSize}
                                    H={InfoGridHeight}
                                    W={oneInfoWidth}
                                    MarginRight={defaultMargin + "px"}
                                    Data={["Name", "ID", "Device Type", "Protocol Type"]}
                                    Value={[
                                        props.selectedDeviceInfo.name,
                                        props.selectedDeviceInfo.id,
                                        props.selectedDeviceInfo.type,
                                        props.selectedDeviceInfo.protocolType]}
                                    OnClickEdit={props.OnClickDeviceEdit}
                                />
                            </li>

                            <li>
                                 <IPlatInfoTable
                                    Title={"Sensor Information"}
                                    FontColor={COLORS.GOLD_TEXT}

                                    MarginRight={defaultMargin + "px"}
                                    FontSize={defaultFontSize}
                                    H={InfoGridHeight}
                                    W={twoInfoWidth}

                                    Data={["Name", "ID", "Type"]}
                                    Value={[
                                        props.selectedSensorInfo.name,
                                        props.selectedSensorInfo.id,
                                        props.selectedSensorInfo.type]}
                                    OnClickEdit={props.OnClickSensorEdit}
                                 />
                            </li>

                            <li className={"monitoring"}>
                                {/**********************상태 표시를 위해 추가**********************/}
                                {/*<div className={"monitoring-connection-status"}>*/}
                                {/*    <IPlatStateText*/}
                                {/*        Display={props.isRtMonitoringConnectionStatus == true ? "block" : "none"}*/}
                                {/*        W={"90px"}*/}
                                {/*        H={"16px"}*/}
                                {/*        Title={"CONNECTED"}*/}
                                {/*        FontSize={smallFontSize}*/}
                                {/*        AllColor={COLORS.STATE_ON}*/}
                                {/*        IsNotRadius*/}
                                {/*    />*/}
                                {/*    <IPlatStateText*/}
                                {/*        Display={props.isRtMonitoringConnectionStatus == true ? "none" : "block"}*/}
                                {/*        W={"90px"}*/}
                                {/*        H={"16px"}*/}
                                {/*        Title={"DISCONNECTED"}*/}
                                {/*        FontSize={smallFontSize}*/}
                                {/*        AllColor={COLORS.STATE_OFF}*/}
                                {/*        IsNotRadius*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className={"monitoring-status"}>
                                    <IPlatStateText
                                        Display={props.IsMonitoringStart == MONITORING_START ? "block" : "none"}
                                        W={"90px"}
                                        H={"17px"}
                                        Title={"ON AIR"}
                                        FontSize={smallFontSize}
                                        AllColor={COLORS.STATE_ON_MONITOR}
                                        IsNotRadius
                                    />
                                    <IPlatStateText
                                        Display={props.IsMonitoringStart == MONITORING_READY ? "block" : "none"}
                                        W={"90px"}
                                        H={"17px"}
                                        Title={"READY"}
                                        FontSize={smallFontSize}
                                        AllColor={COLORS.STATE_READY}
                                        IsNotRadius
                                    />
                                    <IPlatStateText
                                        Display={props.IsMonitoringStart == MONITORING_STOP ? "block" : "none"}
                                        W={"90px"}
                                        H={"17px"}
                                        Title={"STOPPED"}
                                        FontSize={smallFontSize}
                                        AllColor={COLORS.STATE_OFF_MONITOR}
                                        IsNotRadius
                                    />
                                    <IPlatStateText
                                        Display={props.IsMonitoringStart == MONITORING_NA ? "block" : "none"}
                                        W={"90px"}
                                        H={"17px"}
                                        Title={"NA"}
                                        FontSize={smallFontSize}
                                        AllColor={COLORS.STATE_NA}
                                        IsNotRadius
                                    />
                                </div>

                                <IPlatMonitoringPanel
                                    Title={"Real-Time Monitoring"}
                                    FontColor={COLORS.GOLD_TEXT}

                                    FontSize={defaultFontSize}
                                    H={InfoGridHeight}
                                    W={threeInfoWidth}

                                    ////////////////////////
                                    Data={["RT Monitoring Status"]}
                                    Value={[
                                        ,
                                        ]}
                                    ////////////////////////

                                    OnClickMonitoringStart={props.OnClickMonitoringStart}
                                    OnClickMonitoringStop={props.OnClickMonitoringStop}

                                    isToggleMonitoringStart={props.isToggleMonitoringStart}
                                    isToggleMonitoringStop={props.isToggleMonitoringStop}
                                />
                            </li>
                        </ul>

                        <div className={"right-container graph-and-Text"}>
                            <IPlatGraphTable
                                IsRealTime={props.IsMonitoringStart != MONITORING_START}
                                Title={"Graph & Text"}
                                FontColor={COLORS.GOLD_TEXT}
                                FontSize={defaultFontSize}
                                H={GraphGridHeight}
                                W={"55px"}

                                LINE_GRAPH_LABELS={props.LINE_GRAPH_LABELS}
                                LINE_GRAPH_DATA={props.LINE_GRAPH_DATA}
                                LINE_GRAPH_FIRST_TIME_STAMP={props.LINE_GRAPH_FIRST_TIME_STAMP}

                                OnClickContentsZoomIn={props.OnClickContentsZoomIn}
                                OnClickContentsZoomOut={props.OnClickContentsZoomOut}
                                OnClickContentsPrevious={props.OnClickContentsPrevious}
                                OnClickContentsNext={props.OnClickContentsNext}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {props.isSessionOk ? null : <Redirect to={"/"}/>}

            {props.DIALOG_DEVICE_SHOWING ? <IPlatDeviceRegisterPopup USER_TOKEN={props.user.token} OnClickDialogClose={props.OnClickDeviceRegisterDialogClose}/> : null }
            {props.DIALOG_SENSOR_SHOWING ? <IPlatSensorRegisterPopup USER_TOKEN={props.user.token} CURRENT_DEVICE_ID={props.selectedDeviceInfo.id} OnClickDialogClose={props.OnClickSensorRegisterDialogClose}/> : null }

            {props.isDeviceEditDialogShow ? <IPlatDeviceEditPopup
                USER_TOKEN={props.user.token}
                DEVICE_ID={props.selectedDeviceInfo.id}
                DEVICE_NAME={props.selectedDeviceInfo.name}
                OnClickDialogClose={props.OnClickDeviceRegisterDialogClose}
            /> : null }

            {props.isSensorEditDialogShow ? <IPlatSensorEditPopup
                USER_TOKEN={props.user.token}
                DEVICE_ID={props.selectedDeviceInfo.id}
                SENSOR_ID={props.selectedSensorInfo.id}
                SENSOR_NAME={props.selectedSensorInfo.name}
                SENSOR_TYPE={props.selectedSensorInfo.type}
                OnClickDialogClose={props.OnClickSensorRegisterDialogClose}
            /> : null }
        </div>
    )
}
export default IPlatDeviceManagementPageUI;
