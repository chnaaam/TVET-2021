import React from 'react';
import IPlatNavigation from "../templates/nav_bar/iplat_navigation";
import IPlatDashboardPanel from "../templates/dashboard/iplat_dashboard_panel";
import IPlatDashboardWorkspace from "../templates/dashboard/iplat_dashboard_workspace";
import {Redirect} from "react-router-dom";

function IPlatDashboardPageUI(props){
    return(
        <div>
            <IPlatNavigation UserID={props.USER_ID} ClickLogout={props.clickLogout}/>

            <div style={{
                height: "100vh",
            }}>
                <IPlatDashboardPanel
                    deviceList={props.deviceList}
                    sensorList={props.sensorList}
                    dataList={props.dataList}
                    selectedDeviceInfo={props.selectedDeviceInfo}
                    selectedSensorInfo={props.selectedSensorInfo}

                    OnDeviceItemClick={props.OnDeviceItemClick}
                    OnSensorItemClick={props.OnSensorItemClick}
                    OnDataItemClick={props.OnDataItemClick}

                    OnClick={props.OnPanelItemClick}/>

                <IPlatDashboardWorkspace
                    WorkSpaceItems={props.WorkSpaceItems}
                    selectedDataInfo={props.selectedDataInfo}

                    selectedItemIdx={props.selectedItemIdx}

                    OnClickItem={props.OnClickItem}
                    OnClickForRemoveItem={props.OnClickForRemoveItem}
                    OnChangeWidgetPosition={props.OnChangeWidgetPosition}

                />
            </div>

            {props.isSessionOk ? null : <Redirect to={"/"}/>}
        </div>
    )
}
export default IPlatDashboardPageUI;
