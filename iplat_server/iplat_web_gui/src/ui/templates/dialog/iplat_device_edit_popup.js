import React, {useState} from 'react';
import './css/iplat_device_edit_popup.css'

import IPlatTitle from "../../component/text/iplat_title";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatTextFieldWithHeaderAndFooter from "../text_field/iplat_text_field_with_header_and_footer";
import IPlatSelectBoxWithHeader from "../select_box/iplat_select_box_with_header";
import IPlatButton from "../../component/button/iplat_button";
import {netDeviceEdit, netDeviceRegister} from "../../../core/net/device";
import {CODE} from "../../../core/net/err_code";
import IPlatWarningText from "../text/iplat_warning_text";


export default function IPlatDeviceEditPopup(props){
    const DeviceTypeItemList = ["Arduino", "Raspberry Pi", "SBox"]
    const ProtocolTypeItemList = ["TCP/IP", "HTTP", "MQTT"]

    const [deviceName, setDeviceName] = useState(props.DEVICE_NAME)
    const [deviceType, setDeviceType] = useState(DeviceTypeItemList[0])
    const [protocolType, setProtocolType] = useState(ProtocolTypeItemList[0])

    const [isWarningMsgShow, setWarningMsgShow] = useState(false)
    const [warningMsg, setWarningMsg] = useState("")

    const clickEdit = async () => {
        if (deviceName === "") {
            setWarningMsgShow(true)
            setWarningMsg("Please insert device name")
            return;
        }

        const result = await netDeviceEdit(
            props.USER_TOKEN,
            props.DEVICE_ID,
            deviceName,
            deviceType,
            protocolType
        )

        if (result['CODE'] === CODE.STATUS_FAILED) {
            // Device already is existed
            alert("Failed to update device information")
            return;
        } else {
            // Success
            alert("Success to update device")
            props.OnClickDialogClose()
        }
    }

    return(
        <div className={"device-edit-body"}>
            <ul className={"device-edit-content"}>
                <li>
                    <IPlatTitle
                        Title={"Device Edit"}
                        FontSize={"30px"}
                        FontColor={COLORS.TEXT}
                    />
                </li>

                <li>
                    <IPlatTextFieldWithHeaderAndFooter
                        Title={"Device Name"}
                        Value={deviceName}
                        FontSize={"20px"}
                        FontColor={COLORS.TEXT}
                        FotterTitle={"\n" + "Only lower letters and numbers are available"}
                        // HandleChange={handleChangeDeviceName}
                        HandleChange={(e) => setDeviceName(e.target.value)}
                    />
                </li>

                <li>
                    <IPlatSelectBoxWithHeader
                        Title={"Devie Type"}
                        ItemList={DeviceTypeItemList}
                        FontSize={"20px"}
                        OnChange={(e) => setDeviceType(e.target.value)}/>
                </li>

                <li>
                    <IPlatSelectBoxWithHeader
                        Title={"Protocol Type"}
                        ItemList={ProtocolTypeItemList}
                        FontSize={"20px"}
                        OnChange={(e) => setProtocolType(e.target.value)}/>
                </li>

                <li className={"device-edit-error-area"}>
                    {
                        isWarningMsgShow ?
                            <div>
                                <IPlatWarningText
                                    FontSize={"12px"}
                                    Title={warningMsg}
                                    FontColor={"red"}/>
                            </div>
                            :
                            null
                    }
                </li>

                <li>
                    <div className={"device-edit-cancel-btn"}>
                        <IPlatButton
                            W={"180px"}
                            H={"50px"}

                            Title={"Cancel"}
                            FontSize={"22px"}
                            OnClick={props.OnClickDialogClose}
                        />
                    </div>

                    <div className={"device-edit-register-btn"}>
                        <IPlatButton
                            W={"180px"}
                            H={"50px"}
                            Title={"Edit"}
                            FontSize={"22px"}
                            OnClick={clickEdit}/>
                    </div>
                </li>
            </ul>
        </div>
    )
}
