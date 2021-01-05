import axiosPost from "./utils"
import {CODE} from "./err_code";

export async function netSensorList(userToken, deviceId) {
    let r = await axiosPost(
        "/sensor/list",
        {
            "user_token": userToken,
            "device_id": deviceId
        })

    const result = r['data']
    if(result["STATUS"] === false)
        return null;

    const sensors = result["sensor_list"]
    const sensorsLength = Object.keys(sensors).length

    const sensorList = []
    const sensorIDs = []

    for(let i = 0 ; i < sensorsLength ; i++)
    {
        sensorList.push(sensors[i]["SENSOR_NAME"])
        sensorIDs.push(sensors[i]["SENSOR_ID"])
    }

    return {"SENSOR_LIST" : sensorList, "SENSOR_ID" : sensorIDs}
}

export async function netSensorRegister(userToken, deviceId, sensorName, sensorType) {
    let r = await axiosPost(
        "/sensor/register",
        {
            "user_token": userToken,
            "device_id": deviceId,
            "sensor_name": sensorName,
            "sensor_type": sensorType,
        })

    const result = r['data']

    if(result["STATUS"] === CODE.SESSION_FAILED)
        return;

    return result
}

export async function netSensorInformation(userToken, deviceId, sensorId) {
    let r = await axiosPost(
        "/sensor/information",
        {
            "user_token": userToken,
            "device_id": deviceId,
            "sensor_id": sensorId,
        })

    const result = r['data']

    if(result["STATUS"] === false)
        return;

    return result['sensor_info']
}

export async function netSensorDelete(sensorId) {
    let r = await axiosPost(
        "/sensor/delete",
        {"sensor_id": sensorId})

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    console.log(result)

    return result
}

export async function netSensorEdit(userToken, deviceId, sensorId, sensorName, sensorType) {
    console.log(deviceId)
    let r = await axiosPost(
        "/sensor/edit",
        {
            "user_token": userToken,
            "device_id": deviceId,
            "sensor_id": sensorId,
            "sensor_name": sensorName,
            "sensor_type": sensorType
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    console.log(result)

    return result
}

export async function netSensorNum(userToken) {
    let r = await axiosPost(
        "/sensor/num",
        {
            "user_token": userToken,
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    console.log(result)

    return result
}

export async function netAliveCheck(deviceId, sensorId) {
    let r = await axiosPost("/sensor/alive_check")
    console.log(r)
    const result = r['data']

    if(result["status"] === false)
        return;

    return result
}
