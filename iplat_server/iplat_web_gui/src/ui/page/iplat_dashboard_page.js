import React from 'react';
import IPlatDashboardPageUI from "./iplat_dashboard_page_ui";
import IPlatWorkspaceItem from "../component/dashboard_items/iplat_workspace_item";
import {netDeviceInformation, netDeviceList} from "../../core/net/device";
import {netSensorInformation, netSensorList} from "../../core/net/sensor";
import {netDataContents, netDataList} from "../../core/net/data";
import {netGetSession} from "../../core/net/session";
import {CODE} from "../../core/net/err_code";
import {checkUserSession} from "../../core/user";

export default class IPlatDashboardPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isSessionOk: true,

            user: {id:"", token:""},
            workSpaceItems: [],

            deviceList : { names:[], ids:[] },
            selectedDeviceInfo : {  id:"", name:"", type:"", protocolType:"", registerDate:""   },

            sensorList : {names:[], ids:[]},
            selectedSensorInfo : {id:"", name:"", type:""},

            dataList : {names:[], ids:[]},
            selectedItemsData: {

            },

            selectedDataInfo:{
                x:[], y:[], xInfo: "",

                deviceName: "",
                sensorName: "",
                fileName: "",
            },

            selectedItemIdx: 0
        }
    }

    async componentDidMount() {
        // Check session
        const result = await checkUserSession()

        if(result.isSessionOk === false){
            await this.setState({isSessionOk:result.isSessionOk});
            return;
        }

        const userId = result.userId;
        const userToken = result.userToken;

        let userInfo = Object.assign({}, this.state.user)
        userInfo.id = userId
        userInfo.token = userToken

        await this.setState({user: userInfo})

        // Initialize dash board page
        await this.update()
    }

    // region Update UI
    async update(){
        const userToken = this.state.user.token
        if(userToken == "")
            return;

        // Update Device List
        await this.updateDeviceList()
        await this.updateDeviceInformation(this.state.deviceList.ids[0])

        // Update Sensor List
        await this.updateSensorList()
        await this.updateSensorInformation(this.state.sensorList.ids[0])

        // Update Data List
        await this.updateDataList()

        if(this.state.dataList.ids.length > 0)
            await this.updateData(this.state.dataList.ids[0], 0, 16)
        else
        {
            let data = Object.assign({}, this.state.selectedDataInfo);
            data.fileName = "";
            data.x = [];
            data.y = [];
            data.xInfo = "";
            data.deviceName = "";
            data.sensorName = "";

            data.batchIndex = 0;
            data.batchLength = 0;

            data.length = 16;

            this.setState({selectedDataInfo: data});
        }
    }

    async updateDeviceList(){
        const userToken = this.state.user.token;
        const res = await netDeviceList(userToken).catch(function(e){
            return null;
        })

        if(res === null || res === undefined) return;

        let deviceList = Object.assign({}, this.state.deviceList);
        deviceList.ids = res.DEVICE_ID;
        deviceList.names = res.DEVICE_LIST;

        this.setState({deviceList : deviceList});
    }

    async updateDeviceInformation(deviceId){
        const userToken = this.state.user.token;
        const res = await netDeviceInformation(userToken, deviceId).catch(function(e){
            return null;
        })

        if(res === null || res === undefined) return;

        let deviceInfo = Object.assign({}, this.state.selectedDeviceInfo);
        deviceInfo.id = deviceId;
        deviceInfo.name = res.DEVICE_NAME;
        deviceInfo.type = res.DEVICE_TYPE;
        deviceInfo.protocolType = res.PROTOCOL_TYPE;
        deviceInfo.registerDate = res.REGISTER_DATE;

        this.setState({selectedDeviceInfo: deviceInfo});
    }

    async updateSensorList(){
        const userToken = this.state.user.token;
        const deviceId = this.state.selectedDeviceInfo.id;
        const res = await netSensorList(userToken, deviceId).catch(function(e){
            return null;
        })

        if(res === null || res === undefined) return;

        let sensorList = Object.assign({}, this.state.sensorList);
        sensorList.ids = res.SENSOR_ID;
        sensorList.names = res.SENSOR_LIST;

        this.setState({sensorList : sensorList})
    }

    async updateSensorInformation(sensorId){
        const userToken = this.state.user.token;
        const deviceId = this.state.selectedDeviceInfo.id;
        const res = await netSensorInformation(userToken, deviceId, sensorId).catch(function(e){
            return null;
        })

        if(res === null || res === undefined) return;

        let sensorInfo = Object.assign({}, this.state.selectedSensorInfo);
        sensorInfo.id = sensorId;
        sensorInfo.name = res.SENSOR_NAME;
        sensorInfo.type = res.SENSOR_TYPE;

        this.setState({selectedSensorInfo: sensorInfo})
    }

    async updateDataList(){
        const userToken = this.state.user.token;
        const deviceId = this.state.selectedDeviceInfo.id;
        const sensorId = this.state.selectedSensorInfo.id;
        const res = await netDataList(userToken, deviceId, sensorId).catch(function(e){
            return null;
        })
        console.log("Update data list : ", res);

        if(res === null || res === undefined) return;

        let dataList = Object.assign({}, this.state.dataList);

        if(res.DATA_LIST.length == dataList.ids.length)
            return;

        dataList.ids = res.DATA_LIST;
        dataList.names = res.DATA_LIST;

        this.setState({dataList: dataList})
    }

    async updateData(startTime, index, dataLength){
        const userToken = this.state.user.token;
        const deviceId = this.state.selectedDeviceInfo.id;
        const sensorId = this.state.selectedSensorInfo.id;
        startTime = startTime.split(" ").join("").split(".").join("").split(":").join("")

        const res = await netDataContents(
            userToken,
            deviceId,
            sensorId,
            startTime,
            index,
            dataLength
        ).catch(function(e){ return null; })

        if(res === null || res === undefined) return;


        const time_stamp = res['TIMESTAMP'];  // X Axis
        const x = res['INDEX'];      // X Axis
        const y = res['DATA'];       // Y Axis

        if(x.length == 0 || y.length == 0)
            return;

        // const xInfo = x[0].substring(0, 19);

        const batchIndex = res['BATCH_INDEX'];
        const batchLength = res['BATCH_LENGTH'];

        // for(let i = 0 ; i < x.length ; i++)
        //     x[i] = x[i].substring(17, x[i].length-5);
        console.log("TT : ", res);
        console.log("TT : ", batchIndex);
        let data = Object.assign({}, this.state.selectedDataInfo);
        data.fileName = startTime;
        data.x = x;
        data.y = y;
        data.xInfo = time_stamp;
        data.length = dataLength;
        data.batchIndex = batchIndex;
        data.batchLength = batchLength;

        this.setState({selectedDataInfo: data});
    }
    // endregion

    // region Click Event
    async OnDeviceItemClick(e) {
        const clickedDeviceId = e.currentTarget.dataset.id;

        // Update Device Information
        await this.updateDeviceInformation(clickedDeviceId);

        // Update Sensor List and Information
        await this.updateSensorList()
        await this.updateSensorInformation(this.state.sensorList.ids[0])

        // Update Data List and Information
        await this.updateDataList()

        // Initialize graph data
        if(this.state.dataList.ids.length > 0)
            await this.updateData(this.state.dataList.ids[0], 0, 16)
        else
        {
            let data = Object.assign({}, this.state.selectedDataInfo);
            data.fileName = "";
            data.deviceName = "";
            data.sensorName = "";
            data.x = [];
            data.y = [];
            data.xInfo = "";

            this.setState({selectedDataInfo: data});
        }
    }

    async OnSensorItemClick(e) {
        const clickedSensorId = e.currentTarget.dataset.id

        await this.updateSensorInformation(clickedSensorId)

        // Update Data List and Information
        await this.updateDataList()

        // Initialize graph data
        if(this.state.dataList.ids.length > 0)
            await this.updateData(this.state.dataList.ids[0], 0, 16)
        else
        {
            let data = Object.assign({}, this.state.selectedDataInfo);
            data.fileName = "";
            data.deviceName = "";
            data.sensorName= "";
            data.x = [];
            data.y = [];
            data.xInfo = "";


            this.setState({selectedDataInfo: data});
        }
    }

    async OnDataItemClick(e)
    {
        console.log("Data Item Click")
        const clickedDataItem = e.currentTarget.dataset.id

        await this.updateData(clickedDataItem, 0, 16);
    }

    async OnPanelItemClick(e){
        let size = {'width':0, 'height': 0}
        switch(e){
            case "graph":
                if(this.state.selectedDataInfo.x.length === 0)
                {
                    return;
                }
                size['width'] = "500px";
                size['height'] = "400px";
                break;
            case 'data-viewer-one-line':
                if(this.state.selectedDataInfo.x.length === 0)
                {
                    return;
                }

                size['width'] = "200px";
                size['height'] = "200px";
                break;
            case "text":

                break;
        }

        this.createItem(e, size)
    }

    createItem(e, size){
        let workSpaceItems = this.state.workSpaceItems
        workSpaceItems.push({
            'idx': workSpaceItems.length + 1,
            'type': e,
            'data': this.state.selectedDataInfo,
            'position': {
                'left': 0,
                'top': 0,
            },
            'size': {
                'width': size['width'],
                'height': size['height'],
            }
        })

        this.setState({workSpaceItems: workSpaceItems})
    }

    OnClickItem(e){
        this.setState({selectedItemIdx:e})
    }

    OnChangeWidgetPosition(idx, left, top){
        // console.log(idx, left, top)

        let workSpaceItems = this.state.workSpaceItems;

        let idx_buffer = -1;
        for(let i = 0 ; i < workSpaceItems.length ; i++)
            if(workSpaceItems[i].idx === idx)
                idx_buffer = i;

        workSpaceItems[idx_buffer]['position']['left'] = left;
        workSpaceItems[idx_buffer]['position']['top'] = top;
        //
        // console.log(workSpaceItems)
    }

    OnClickForRemoveItem(idx){
        let workSpaceItems = this.state.workSpaceItems;

        let idx_buffer = -1;
        for(let i = 0 ; i < workSpaceItems.length ; i++)
            if(workSpaceItems[i].idx === idx)
                idx_buffer = i

        workSpaceItems.splice(idx_buffer, 1)
        // console.log("Remove Item | Removed Items", workSpaceItems)

        this.setState({workSpaceItems: workSpaceItems})
    }

    render() {
        return(
            <IPlatDashboardPageUI
                isSessionOk={this.state.isSessionOk}

                deviceList={this.state.deviceList}
                sensorList={this.state.sensorList}
                dataList={this.state.dataList}
                selectedDeviceInfo={this.state.selectedDeviceInfo}
                selectedSensorInfo={this.state.selectedSensorInfo}
                selectedDataInfo={this.state.selectedDataInfo}

                OnDeviceItemClick={this.OnDeviceItemClick.bind(this)}
                OnSensorItemClick={this.OnSensorItemClick.bind(this)}
                OnDataItemClick={this.OnDataItemClick.bind(this)}

                WorkSpaceItems={this.state.workSpaceItems}
                OnPanelItemClick={this.OnPanelItemClick.bind(this)}

                selectedItemIdx={this.state.selectedItemIdx}

                OnClickItem={this.OnClickItem.bind(this)}
                OnClickForRemoveItem={this.OnClickForRemoveItem.bind(this)}
                OnChangeWidgetPosition={this.OnChangeWidgetPosition.bind(this)}
            />
        )
    }
}

