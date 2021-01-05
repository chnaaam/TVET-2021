import axiosPost from "./utils"
import {CODE} from "./err_code";

export async function netDataList(deviceId, sensorId) {
    let r = await axiosPost(
        "/data/list",
        {
            "device_id": deviceId,
            "sensor_id": sensorId,
        })

    const result = r['data']

    if(result["status"] === false)
        return;

    const datas = result["data_list"]
    const datasLength = Object.keys(datas).length
    const dataStartTimeList = []
    const dataEndTimeList = []
    const dataElapsedTimeList = []

    for(let i = 0 ; i < datasLength ; i++)
    {
        dataStartTimeList.push(datas[i]["START_TIME"])
    }

    return {"DATA_LIST" : dataStartTimeList}
}

export async function netDataContents(userToken, deviceId, sensorId, startTime, index, dataLength) {
    let r = await axiosPost(
        "/data/contents",
        {
            "user_token": userToken,
            "device_id": deviceId,
            "sensor_id": sensorId,
            "start_time": startTime,
            "content_index": index,
            "data_length": dataLength,
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    return result
}

export async function netMonitoringStart(deviceId, sensorId) {
    let r = await axiosPost(
        "/data/monitoring/start",
        {
            "device_id": deviceId,
            "sensor_id": sensorId,
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    return result
}

export async function netDownloadData(deviceId, sensorId, file_name) {
    let r = await axiosPost(
        "/data/download",
        {
            "device_id": deviceId,
            "sensor_id": sensorId,
            "file_name": file_name
        }).then((data) => {

            const link = document.createElement('a');
            const url = URL.createObjectURL(new Blob([data.data], {type: "application/text"}));
            link.download = file_name + ".csv";
            link.href = url;

            document.body.appendChild(link);
            link.click()
            document.body.removeChild(link);

    }).catch((e) => {
        console.log("Error : ", e)
    });
}

export async function netDataDelete(deviceId, sensorId, fileName) {
    let r = await axiosPost(
        "/data/delete",
        {
            "device_id": deviceId,
            "sensor_id": sensorId,
            "file_name": fileName
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    return result
}
