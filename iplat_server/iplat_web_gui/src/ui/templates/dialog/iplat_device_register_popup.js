import React, {useState} from 'react';
import './css/iplat_device_register_popup.css'

import IPlatTitle from "../../component/text/iplat_title";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatTextFieldWithHeaderAndFooter from "../text_field/iplat_text_field_with_header_and_footer";
import IPlatSelectBoxWithHeader from "../select_box/iplat_select_box_with_header";
import IPlatButton from "../../component/button/iplat_button";
import {netDeviceEdit, netDeviceRegister} from "../../../core/net/device";
import {CODE} from "../../../core/net/err_code";
import IPlatWarningText from "../text/iplat_warning_text";

export default function IPlatDeviceRegisterPopup(props){
    const DeviceTypeItemList = ["Arduino", "Raspberry Pi", "SBox"]
    const ProtocolTypeItemList = ["TCP/IP", "HTTP", "MQTT"]

    const [deviceName, setDeviceName] = useState("")
    const [deviceType, setDeviceType] = useState(DeviceTypeItemList[0])
    const [protocolType, setProtocolType] = useState(ProtocolTypeItemList[0])

    const [isWarningMsgShow, setWarningMsgShow] = useState(false)
    const [warningMsg, setWarningMsg] = useState("")

    const clickRegister = async () => {
        if (deviceName === "") {
            setWarningMsgShow(true)
            setWarningMsg("Please insert device name")
            return;
        }

        const result = await netDeviceRegister(
            props.USER_TOKEN,
            deviceName,
            deviceType,
            protocolType
        )

        if (result['CODE'] === CODE.ALREADY_DEVICE_IS_EXISTED) {
            // Device already is existed
            alert("Device is aleady existed")
            return;
        } else {
            // Success
            alert("Success to register device")
            props.OnClickDialogClose()
        }
    }

    return(
        <div className={"device-register-body"}>
            <ul className={"device-register-content"}>
                <li>
                    <IPlatTitle
                        Title={"Device Registration"}
                        FontSize={"30px"}
                        FontColor={COLORS.TEXT}
                    />
                </li>

                <li>
                    <IPlatTextFieldWithHeaderAndFooter
                        Title={"Device Name"}
                        FontSize={"20px"}
                        FontColor={COLORS.TEXT}
                        FotterTitle={"\n" + "Please use lower-case letters and numbers.(max 20)"}
                        // HandleChange={handleChangeDeviceName}
                        HandleChange={(e) => setDeviceName(e.target.value)}
                    />
                </li>

                <li>
                    <IPlatSelectBoxWithHeader
                        Title={"Device Type"}
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

                <li className={"device-register-error-area"}>
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
                    <div className={"device-register-cancel-btn"}>
                        <IPlatButton
                            W={"180px"}
                            H={"50px"}

                            BgColor={"#333640"}
                            BgHoverColor={"#333640"}

                            Title={"Cancel"}
                            FontSize={"22px"}
                            OnClick={props.OnClickDialogClose}
                        />
                    </div>

                    <div className={"device-register-register-btn"}>
                        <IPlatButton
                            W={"180px"}
                            H={"50px"}

                            BgColor={COLORS.BUTTON}
                            BgHoverColor={COLORS.BUTTON}

                            Title={"Register"}
                            FontSize={"22px"}
                            OnClick={clickRegister}/>
                    </div>
                </li>
            </ul>
        </div>
    )

}
