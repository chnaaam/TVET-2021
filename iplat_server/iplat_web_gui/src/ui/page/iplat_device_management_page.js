import React, {useCallback} from 'react';
import socketio from 'socket.io-client';

import {netDeviceDelete, netDeviceInformation, netDeviceList} from "../../core/net/device";
import {netAliveCheck, netSensorDelete, netSensorInformation, netSensorList} from "../../core/net/sensor";
import {netDataContents, netDataDelete, netDataList, netDownloadData, netMonitoringStart} from "../../core/net/data";
import IPlatDeviceManagementPageUI from "./iplat_device_management_page_ui";
import {checkUserSession} from "../../core/user";

const MONITORING_NA = -1
const MONITORING_START = 0
const MONITORING_STOP = 1
const MONITORING_READY = 2

export default class IPlatDeviceManagementPage extends React.Component{

    //region Constructor
    constructor(props) {
        super(props);

        this.state = {
            isSessionOk: true,
            isDeviceDialogShow: false,
            isSensorDialogShow: false,
            isDeviceEditDialogShow: false,
            isSensorEditDialogShow: false,
            isMonitoringStart: MONITORING_READY,

            user:{  id: "", token: "" },

            deviceList : { names:[], ids:[], isAlives:[] },
            selectedDeviceInfo : {  id:"", name:"", type:"", protocolType:"", registerDate:""   },

            sensorList : {names:[], ids:[], isAlives:[]},
            selectedSensorInfo : {id:"", name:"", type:""},

            dataList : {names:[], ids:[]},
            selectedDataInfo:{
                fileName: "",

                x:[], y:[], xInfo: "",

                // Previous or Next
                batchIndex: 0, batchLength: 0,

                // Zoom in /out
                length: 16, maxDataLength: 64, minDataLength: 4,
            },

            isRtMonitoringConnectionStatus: true,

            isToggleMonitoringStart: false,
            isToggleMonitoringStop: false,
        }

        this.socket = null
        this.streaming_socket = ""
        this.updateChart = this.updateChart.bind(this)
    }

    async componentDidMount() {
        // Check session
        const result = await checkUserSession()

        if(result.isSessionOk === false){
            // await this.setState({isSessionOk:result.isSessionOk});
            this.props.history.push('/');
            return;
        }

        const userId = result.userId;
        const userToken = result.userToken;

        let userInfo = Object.assign({}, this.state.user)
        userInfo.id = userId
        userInfo.token = userToken

        await this.setState({user: userInfo})

        // Initialize device management page
        await this.update()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.intervalUpdateMonitoringStart);
        clearInterval(this.intervalDataList);
        clearInterval(this.intervalIsAliveDevice);
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


        // First Call
        this.intervalUpdataDataList()
        this.intervalUpdateIsAliveDevice();

        this.intervalDataList = setInterval(() => this.intervalUpdataDataList(), 1000)
        this.intervalIsAliveDevice = setInterval(() => this.intervalUpdateIsAliveDevice(), 3000)

        if(this.state.dataList.ids.length > 0)
            await this.updateData(this.state.dataList.ids[0], 0, 16)
        else
        {
            let data = Object.assign({}, this.state.selectedDataInfo);
            data.fileName = "";
            data.x = [];
            data.y = [];
            data.xInfo = "";

            data.batchIndex = 0;
            data.batchLength = 0;

            data.length = 16;

            this.setState({selectedDataInfo: data});
        }
    }

    async intervalUpdataDataList(){
        // Update Data List
        await this.updateDataList()
    }

    async intervalUpdateIsAliveDevice(){
        await this.isAliveCheckDevice(
            this.state.selectedDeviceInfo.id,
            this.state.selectedSensorInfo.id
        )
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
        deviceList.isAlives = [];

        this.setState({deviceList : deviceList});

    }

    async updateDeviceInformation(deviceId){
        const userToken = this.state.user.token;
        const res = await netDeviceInformation(userToken, deviceId).catch(function(e){
            return null;
        })

        if(res === null || res === undefined) {
            this.setState({selectedDeviceInfo : {  id:"", name:"", type:"", protocolType:"", registerDate:""   }});
            return;
        }

        let deviceInfo = Object.assign({}, this.state.selectedDeviceInfo);
        deviceInfo.id = deviceId;
        deviceInfo.name = res.DEVICE_NAME;
        deviceInfo.type = res.DEVICE_TYPE;
        deviceInfo.protocolType = res.PROTOCOL_TYPE;
        deviceInfo.registerDate = res.REGISTER_DATE;

        await this.setState({selectedDeviceInfo: deviceInfo});
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

        if(res === null || res === undefined) {
            this.setState({selectedSensorInfo : {id:"", name:"", type:""}});
            return;
        }

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
        const res = await netDataList(deviceId, sensorId).catch(function(e){
            return null;
        })

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
        if(this.isMonitoringRunning())  return;

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
            data.x = [];
            data.y = [];
            data.xInfo = "";

            data.batchIndex = 0;
            data.batchLength = 0;

            data.length = 16;

            this.setState({selectedDataInfo: data});
        }
    }

    async OnSensorItemClick(e)
    {
        if(this.isMonitoringRunning())  return;

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
            data.x = [];
            data.y = [];
            data.xInfo = "";

            data.batchIndex = 0;
            data.batchLength = 0;

            data.length = 16;

            this.setState({selectedDataInfo: data});
        }

        // Update rt monitoring status
        // isMonitoringStart
        let sensorList = Object.assign({}, this.state.sensorList);
        const sidList = sensorList.ids;

        var sidIdx = -1;
        for(var i = 0 ; i < sidList.length ; i++){
            if(sidList[i] == clickedSensorId) {
                sidIdx = i;
                break;
            }
        }
        console.log(sidIdx, this.state.sensorList.isAlives[sidIdx])
        if(sidIdx == -1){
            this.setState({isMonitoringStart: MONITORING_STOP});
            return;
        }

        if(this.state.sensorList.isAlives[sidIdx] == false)
        {
            this.setState({isMonitoringStart: MONITORING_STOP});
            return;
        }
        else{
            this.setState({isMonitoringStart: MONITORING_READY});
        }
    }

    async OnDataItemClick(e)
    {
        if(this.isMonitoringRunning())  return;

        const clickedDataItem = e.currentTarget.dataset.id

        await this.updateData(clickedDataItem, 0, 16);
    }

    OnClickDeviceNew(){
        if(this.isMonitoringRunning())  return;

        this.setState({isDeviceDialogShow:true})
    }

    async OnClickDeviceDelete(){
        if(this.isMonitoringRunning())  return;

        if(this.state.selectedSensorInfo.id != undefined)
            await netSensorDelete(this.state.selectedSensorInfo.id)

        const resultDeviceDelete = await netDeviceDelete(this.state.selectedDeviceInfo.id)

        alert("Success to delete device")
        await this.update(this.state.user.token)
    }

    OnClickDeviceEdit(){
        if(this.isMonitoringRunning())  return;

        this.setState({
            isDeviceEditDialogShow:true,
        })
    }

    OnClickSensorNew(){
        if(this.isMonitoringRunning())  return;

        if(this.state.deviceList.ids.length === 0)
        {
            alert("Please register the device first")
            return
        }

        this.setState({isSensorDialogShow:true})
    }

    async OnClickSensorDelete(){
        if(this.isMonitoringRunning())  return;

        const resultSensorDelete = await netSensorDelete(this.state.selectedSensorInfo.id)

        await this.update(this.state.user.token)
    }

    async OnClickDeviceRegisterDialogClose(){
        this.setState({
            isDeviceDialogShow:false,
            isDeviceEditDialogShow:false,
        })

        await this.update()
    }

    OnClickSensorEdit(){
        if(this.isMonitoringRunning())  return;

        this.setState({
            isSensorEditDialogShow:true,
        })
    }

    async OnClickSensorRegisterDialogClose(){
        this.setState({
            isSensorDialogShow:false,
            isSensorEditDialogShow:false,
        })

        await this.update()
    }

    async OnClickDataDelete(){
        if(this.isMonitoringRunning())  return;

        const resultSensorDelete = await netDataDelete(
            this.state.selectedDeviceInfo.id,
            this.state.selectedSensorInfo.id,
            this.state.selectedDataInfo.fileName
        )

        await this.update(this.state.user.token)
    }

    async OnClickContentsZoomIn(){
        // 확대 : +
        const isMonitoringStart = this.state.isMonitoringStart;
        let dataLength = this.state.selectedDataInfo.length;

        if(dataLength / 2 < this.state.selectedDataInfo.minDataLength)
            return;

        dataLength = dataLength / 2;

        if(isMonitoringStart == MONITORING_START)
        {
            let data = Object.assign({}, this.state.selectedDataInfo);
            data.x = data.x.slice(dataLength)
            data.y = data.y.slice(dataLength)
            data.length = dataLength;

            this.setState({selectedDataInfo: data});
        }
        else
            await this.zoomInOutContents(dataLength);
    }

    async OnClickContentsZoomOut(){
        // 축소 : -
        const isMonitoringStart = this.state.isMonitoringStart;
        let dataLength = this.state.selectedDataInfo.length;

        if(dataLength * 2 > this.state.selectedDataInfo.maxDataLength)
            return;

        dataLength = dataLength * 2;

        if(isMonitoringStart == MONITORING_START)
        {
            let data = Object.assign({}, this.state.selectedDataInfo);

            data.length = dataLength;

            this.setState({selectedDataInfo: data});
        }
        else
            await this.zoomInOutContents(dataLength);
    }

    async zoomInOutContents(dataLength){
        const fileName = this.state.selectedDataInfo.fileName;
        const batchIndex = this.state.selectedDataInfo.batchIndex;

        await this.updateData(fileName, batchIndex, dataLength);
    }

    async OnClickContentsPrevious(){
        const fileName = this.state.selectedDataInfo.fileName;
        const dataLength = this.state.selectedDataInfo.length;
        let batchIndex = Number(this.state.selectedDataInfo.batchIndex)

        if(batchIndex > 0)  batchIndex = batchIndex - 1
        else    batchIndex = 0

        await this.updateData(fileName, String(batchIndex), dataLength);
    }

    async OnClickContentsNext(){
        const fileName = this.state.selectedDataInfo.fileName;
        const dataLength = this.state.selectedDataInfo.length;
        let batchIndex = Number(this.state.selectedDataInfo.batchIndex)
        const batchLength = Number(this.state.selectedDataInfo.batchLength)

        if(batchIndex < batchLength - 1)    batchIndex = batchIndex + 1
        else    batchIndex = batchLength - 1

        await this.updateData(fileName, String(batchIndex), dataLength);
    }
    // endregion

    async OnClickMonitoringStart(){
        if(this.isMonitoringRunning())  return;

        if(this.state.selectedDeviceInfo.id == "")
        {
            alert("Please create a device");
            return;
        }

        if(this.state.selectedSensorInfo.id == "")
        {
            alert("Please create a sensor");
            return;
        }

        let deviceList = Object.assign({}, this.state.deviceList);
        const didList = deviceList.ids;
        const selectedDeviceId = this.state.selectedDeviceInfo.id;
        var didIdx = -1;
        for(var i = 0 ; i < didList.length ; i++){
            if(didList[i] == selectedDeviceId) {
                didIdx = i;
                break;
            }
        }

        let sensorList = Object.assign({}, this.state.sensorList);
        const sidList = sensorList.ids;
        const selectedSensorId = this.state.selectedSensorInfo.id;
        var sidIdx = -1;
        for(var i = 0 ; i < sidList.length ; i++){
            console.log(sidList[i], selectedSensorId)
            if(sidList[i] == selectedSensorId) {
                sidIdx = i;
                break;
            }
        }

        if(this.state.deviceList.isAlives[didIdx] == false || this.state.sensorList.isAlives[sidIdx] == false)
        {
            alert("Can't start monitoring, please check the sensor node connection")
            return;
        }

        if(this.state.isMonitoringStart == MONITORING_STOP)
        {
            alert("Please wait")
            return;
        }

        const result = await netMonitoringStart(
            this.state.selectedDeviceInfo.id,
            this.state.selectedSensorInfo.id,
        )
        console.log("Result : ", result);

        if(result === undefined){
            this.setState({isRtMonitoringConnectionStatus: false})
            return;
        }

        // Connect Socket Server
        if(result['STATUS'] == false){
            this.setState({isRtMonitoringConnectionStatus: false})
            return;
        }

        this.socket = socketio.connect(result['net_info'])

        this.initSocket()
        this.intervalSocketioGetData = setInterval(() => this.realtimeLog(), 1000)

        this.setState({isToggleMonitoringStart: true});
        this.setState({isToggleMonitoringStop: false});
    }

    async OnClickMonitoringStop(){
        if(this.state.isAliveDevice == false)
        {
            alert("Can't stop monitoring, please check the sensor node connection")
            return;
        }

        if(this.state.isMonitoringStart == MONITORING_STOP || this.state.isMonitoringStart == MONITORING_NA)
        {
            alert("Please wait")
            return;
        }

        if(this.state.isMonitoringStart == MONITORING_READY){
            alert("First, you must click the monitoring start button")
            return;
        }

        clearInterval(this.intervalSocketioGetData)

        if(this.socket == null)
            return;

        this.socket.disconnect()
        // this.socket.close()
        this.socket = null



        this.setState({isMonitoringStart: MONITORING_STOP})

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

            data.batchIndex = 0;
            data.batchLength = 0;

            data.length = 16;

            this.setState({selectedDataInfo: data});
        }

        this.intervalUpdateMonitoringStart = setInterval(() => this.intervalUpdateMonitoringStatus(), 3000)

        this.setState({isToggleMonitoringStart: false});
        this.setState({isToggleMonitoringStop: true});
    }

    intervalUpdateMonitoringStatus(){
        this.setState({isMonitoringStart: MONITORING_READY});

        clearInterval(this.intervalUpdateMonitoringStart);

        this.setState({isToggleMonitoringStart: false});
        this.setState({isToggleMonitoringStop: false});
    }

    isMonitoringRunning(){
        if(this.state.isMonitoringStart == MONITORING_START)
        {
            alert("Real-time monitoring is already running.");
            return true;
        }
        return false;
    }

    initSocket(){
        let data = Object.assign({}, this.state.selectedDataInfo);
        data.x = [];
        data.y = [];
        data.xInfo = "";
        data.batchIndex = 0;
        data.batchLength = 0;
        data.length = 16;    // TODO Check
        data.maxDataLength = 64;

        this.setState({
            selectedDataInfo: data,
            isMonitoringStart: MONITORING_START
        })

        this.socket.on("disconnect", () =>{
            this.socket.disconnect()
            this.socket.close()
            this.socket = null

            clearInterval(this.intervalSocketioGetData)

            this.setState({isMonitoringStart: MONITORING_STOP})
        })

        this.socket.on("streaming", (data) => {

            const value = data["data"][0]
            let timestamp = data["timestamp"]
            let splitTimestamp = timestamp.substring(12, timestamp.length - 4)

            splitTimestamp = splitTimestamp.substr(0, 2) + "." + splitTimestamp.substr(1, 2)

            this.updateChart(value, timestamp, splitTimestamp)
        })
    }

    updateChart(value, timestamp, splitTimeStamp){
        let data = this.state.selectedDataInfo;
        data.x.push(splitTimeStamp);
        data.y.push(value);

        let firstTimeStamp = timestamp.substring(0, 12)
        firstTimeStamp = firstTimeStamp.substring(0, 4) + "-" + firstTimeStamp.substring(4, 6) + "-" + firstTimeStamp.substring(6, 8) + " " + firstTimeStamp.substring(8, 10) + ":" + firstTimeStamp.substring(10, 12)

        data.xInfo = firstTimeStamp;

        if(data.x.length > data.length)  data.x.shift()
        if(data.y.length > data.length)  data.y.shift()

        this.setState({selectedDataInfo: data})
    }

    realtimeLog(){
        const deviceId = this.state.selectedDeviceInfo.id
        const sensorId = this.state.selectedSensorInfo.id

        this.socket.emit("streaming_request")
    }

    async OnClickDownloadData(e) {
        const deviceId = this.state.selectedDeviceInfo.id
        const sensorId = this.state.selectedSensorInfo.id
        const fileName = this.state.selectedDataInfo.fileName

        await netDownloadData(deviceId, sensorId, fileName);
    }

    async isAliveCheckDevice(){
        const deviceId = this.state.selectedDeviceInfo.id
        const sensorId = this.state.selectedSensorInfo.id

        const res = await netAliveCheck(deviceId, sensorId);
        const aliveList = res["alive_list"];

        let deviceList = Object.assign({}, this.state.deviceList);
        deviceList.isAlives = [];

        for(var i = 0 ; i < deviceList.ids.length ; i++){
            var isFoundAliveToggle = false;
            for(var j = 0 ; j < aliveList.length ; j++){
                if(deviceList.ids[i] == aliveList[j].did){
                    deviceList.isAlives.push(true);
                    isFoundAliveToggle = true;
                    break
                }
            }

            if(isFoundAliveToggle == false)
                deviceList.isAlives.push(false);
        }

        this.setState({deviceList : deviceList});

        let sensorList = Object.assign({}, this.state.sensorList);
        sensorList.isAlives = [];

        for(var i = 0 ; i < sensorList.ids.length ; i++){
            var isFoundAliveToggle = false;
            for(var j = 0 ; j < aliveList.length ; j++){
                if(sensorList.ids[i] == aliveList[j].sid){
                    sensorList.isAlives.push(true);
                    isFoundAliveToggle = true;
                    break
                }
            }

            if(isFoundAliveToggle == false)
                sensorList.isAlives.push(false);
        }

        this.setState({sensorList : sensorList});
        // for(var i = 0 ; i < aliveList.length ; i++){
        //     console.log(deviceList.ids, aliveList[i].did);
        //     if(deviceList.ids == aliveList[i].did)
        //         console.log("Hello");
        //
        // }

        // if(res == undefined){
        //     this.setState({isAliveDevice: false})
        //     this.setState({isMonitoringStart: MONITORING_NA})
        //
        //     this.setState({isToggleMonitoringStart: false});
        //     this.setState({isToggleMonitoringStop: false});
        //
        //     clearInterval(this.interval);
        //     return;
        // }
        //
        // if(res["STATUS"] == false){
        //     this.setState({isAliveDevice: false})
        //     this.setState({isMonitoringStart: MONITORING_NA})
        //
        //     this.setState({isToggleMonitoringStart: false});
        //     this.setState({isToggleMonitoringStop: false});
        //
        //     clearInterval(this.interval);
        //     return;
        // }
        //
        // const isAliveDevice = res['IS_ALIVE']
        //
        // if(isAliveDevice == false){
        //     this.setState({isAliveDevice: false})
        //     this.setState({isMonitoringStart: MONITORING_NA})
        //
        //     this.setState({isToggleMonitoringStart: false});
        //     this.setState({isToggleMonitoringStop: false});
        //
        //     clearInterval(this.interval);
        // }
        // else{
        //     this.setState({isAliveDevice: true})
        //
        //     if(this.state.isMonitoringStart == MONITORING_START)
        //         ;
        //     else
        //         this.setState({isMonitoringStart: MONITORING_READY})
        // }
    }

    render() {
        const {
            user,

            deviceList,
            selectedDeviceInfo,

            sensorList,
            selectedSensorInfo,

            dataList,
            selectedDataInfo,
        } = this.state;

        return(
            <IPlatDeviceManagementPageUI
                // State
                isSessionOk={this.state.isSessionOk}

                // User
                user={user}

                // Device
                deviceList={deviceList}
                selectedDeviceInfo={selectedDeviceInfo}

                // Sensor
                sensorList={sensorList}
                selectedSensorInfo={selectedSensorInfo}

                // Data
                DATA_LIST={dataList.names}

                CURRENT_FILE_NAME={selectedDataInfo.fileName}

                DIALOG_DEVICE_SHOWING={this.state.isDeviceDialogShow}
                DIALOG_SENSOR_SHOWING={this.state.isSensorDialogShow}

                LINE_GRAPH_LABELS={selectedDataInfo.x}
                LINE_GRAPH_DATA={selectedDataInfo.y}
                LINE_GRAPH_FIRST_TIME_STAMP={selectedDataInfo.xInfo}

                IsMonitoringStart={this.state.isMonitoringStart}
                isDeviceEditDialogShow={this.state.isDeviceEditDialogShow}
                isSensorEditDialogShow={this.state.isSensorEditDialogShow}

                isAliveDevice={this.state.isAliveDevice}
                isRtMonitoringConnectionStatus={this.state.isRtMonitoringConnectionStatus}

                isToggleMonitoringStart={this.state.isToggleMonitoringStart}
                isToggleMonitoringStop={this.state.isToggleMonitoringStop}

                // Handler
                OnDeviceItemClick={this.OnDeviceItemClick.bind(this)}
                OnSensorItemClick={this.OnSensorItemClick.bind(this)}
                OnDataItemClick={this.OnDataItemClick.bind(this)}

                OnClickDeviceNew={this.OnClickDeviceNew.bind(this)}
                OnClickDeviceDelete={this.OnClickDeviceDelete.bind(this)}
                OnClickDeviceEdit={this.OnClickDeviceEdit.bind(this)}

                OnClickSensorNew={this.OnClickSensorNew.bind(this)}
                OnClickSensorDelete={this.OnClickSensorDelete.bind(this)}
                OnClickSensorEdit={this.OnClickSensorEdit.bind(this)}

                OnClickDataDelete={this.OnClickDataDelete.bind(this)}

                OnClickDeviceRegisterDialogClose={this.OnClickDeviceRegisterDialogClose.bind(this)}
                OnClickSensorRegisterDialogClose={this.OnClickSensorRegisterDialogClose.bind(this)}

                OnClickContentsZoomIn={this.OnClickContentsZoomIn.bind(this)}
                OnClickContentsZoomOut={this.OnClickContentsZoomOut.bind(this)}
                OnClickContentsPrevious={this.OnClickContentsPrevious.bind(this)}
                OnClickContentsNext={this.OnClickContentsNext.bind(this)}

                OnClickMonitoringStart={this.OnClickMonitoringStart.bind(this)}
                OnClickMonitoringStop={this.OnClickMonitoringStop.bind(this)}

                OnClickDownloadData={this.OnClickDownloadData.bind(this)}
            />
        )
    }
}
