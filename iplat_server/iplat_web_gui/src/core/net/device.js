import axiosPost from "./utils"
import {CODE} from "./err_code";

export async function netDeviceList(userToken) {
    let r = await axiosPost(
        "/device/list",
        {
            "user_token": userToken
        })


    const result = r['data']

    if(result["status"] === false)
        return null;

    const devices = result["device_list"]

    const devicesLength = Object.keys(devices).length

    const deviceList = []
    const deviceIDs = []

    for(let i = 0 ; i < devicesLength ; i++)
    {
        const deviceName = devices[i]["DEVICE_NAME"]
        const deviceId = devices[i]["DEVICE_ID"]

        deviceList.push(deviceName)
        deviceIDs.push(deviceId)
    }

    return {"DEVICE_LIST" : deviceList, "DEVICE_ID" : deviceIDs}
}

export async function netDeviceRegister(userToken, deviceName, deviceType, protocolType) {
    // TODO : Device ID 제거

    console.log("Toekn 2 : ", userToken)
    let r = await axiosPost(
        "/device/register",
        {
            "user_token": userToken,
            "device_name": deviceName,
            "device_type": deviceType,
            "protocol_type": protocolType,
        })

    const result = r['data']
    console.log("Result : ", result);
    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    console.log(result)

    return result
}

export async function netDeviceInformation(userToken, deviceId) {
    let r = await axiosPost(
        "/device/information",
        {
            "user_token": userToken,
            "device_id": deviceId,
        })

    const result = r['data']

    if(result["STATUS"] === false)
        return;

    return result['device_info']
}

export async function netDeviceDelete(deviceId) {
    let r = await axiosPost(
        "/device/delete",
        {
            "device_id": deviceId,
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    console.log(result)

    return result
}

export async function netDeviceEdit(userToken, deviceId, deviceName, deviceType, protocolType) {
    let r = await axiosPost(
        "/device/edit",
        {
            "user_token": userToken,
            "device_id": deviceId,
            "device_name": deviceName,
            "device_type": deviceType,
            "protocol_type": protocolType,
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    console.log(result)

    return result
}

export async function netDeviceNum(userToken) {
    let r = await axiosPost(
        "/device/num",
        {
            "user_token": userToken,
        })

    const result = r['data']

    if(result["STATUS"] === CODE.STATUS_FAILED)
        return;

    return result
}
