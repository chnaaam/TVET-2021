import React, {useState} from 'react';
import './css/iplat_sensor_register_popup.css'

import IPlatTitle from "../../component/text/iplat_title";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatTextFieldWithHeaderAndFooter from "../text_field/iplat_text_field_with_header_and_footer";
import IPlatButton from "../../component/button/iplat_button";
import IPlatWarningText from "../text/iplat_warning_text";
import IPlatTextFieldWithHeader from "../text_field/iplat_text_field_with_header";
import {netSensorRegister} from "../../../core/net/sensor";
import {CODE} from "../../../core/net/err_code";

function IPlatSensorRegisterPopup(props){
    const [sensorName, setSensorName] = useState("")
    const [sensorType, setSensorType] = useState("")

    const [isWarningMsgShow, setWarningMsgShow] = useState(false)
    const [warningMsg, setWarningMsg] = useState("")

    const clickRegister = async () => {
        console.log("Click register")
        if(sensorName === ""){
            setWarningMsgShow(true)
            setWarningMsg("Please insert sensor name")
            return;
        }

        if(sensorType === ""){
            setWarningMsgShow(true)
            setWarningMsg("Please insert sensor type")
            return;
        }
        console.log("Current Device Id : ", props.CURRENT_DEVICE_ID)
        const result = await netSensorRegister(
            props.USER_TOKEN,
            props.CURRENT_DEVICE_ID,
            sensorName,
            sensorType
        )

        if(result['CODE'] === CODE.ALREADY_SENSOR_IS_EXISTED)
        {
            // Device already is existed
            return;
        }
        else
        {
            // Success
            alert("Success to register sensor")
            props.OnClickDialogClose()
        }
    }

    return(
        <div className={"sensor-register-body"}>
            <ul className={"sensor-register-content"}>
                <li>
                    <IPlatTitle
                        Title={"Sensor Registration"}
                        FontSize={"30px"}
                        FontColor={COLORS.TEXT}
                    />
                </li>

                <li>
                    <IPlatTextFieldWithHeaderAndFooter
                        Title={"Sensor Name"}
                        Value={props.SENSOR_NAME}
                        FontSize={"20px"}
                        FontColor={COLORS.TEXT}
                        FotterTitle={"\n" +
                        "Please use lower-case letters and numbers.(max 20)"}
                        HandleChange={(e) => setSensorName(e.target.value)}
                    />
                </li>

                <li>
                    <IPlatTextFieldWithHeader
                        Title={"Sensor Type"}
                        Value={props.SENSOR_TYPE}
                        FontSize={"20px"}
                        HandleChange={(e) => setSensorType(e.target.value)}
                    />
                </li>

                <li className={"sensor-register-error-area"}>
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
                    <div className={"sensor-register-cancel-btn"}>
                        <IPlatButton
                            Title={"Cancel"}
                            W={"180px"}
                            H={"50px"}
                            FontSize={"22px"}
                            OnClick={props.OnClickDialogClose}/>
                    </div>

                    <div className={"sensor-register-register-btn"}>
                        <IPlatButton
                            Title={"Register"}
                            W={"180px"}
                            H={"50px"}
                            FontSize={"22px"}
                            OnClick={clickRegister}
                        />
                    </div>
                </li>
            </ul>

        </div>
    )
}

export default IPlatSensorRegisterPopup;
