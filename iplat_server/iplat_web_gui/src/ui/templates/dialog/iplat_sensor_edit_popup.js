import React, {useState} from 'react';
import './css/iplat_sensor_edit_popup.css'

import IPlatTitle from "../../component/text/iplat_title";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatTextFieldWithHeaderAndFooter from "../text_field/iplat_text_field_with_header_and_footer";
import IPlatButton from "../../component/button/iplat_button";
import IPlatWarningText from "../text/iplat_warning_text";
import IPlatTextFieldWithHeader from "../text_field/iplat_text_field_with_header";
import {netSensorEdit, netSensorRegister} from "../../../core/net/sensor";
import {CODE} from "../../../core/net/err_code";

function IPlatSensorEditPopup(props){
    const [sensorName, setSensorName] = useState(props.SENSOR_NAME)
    const [sensorType, setSensorType] = useState(props.SENSOR_TYPE)

    const [isWarningMsgShow, setWarningMsgShow] = useState(false)
    const [warningMsg, setWarningMsg] = useState("")

    const clickEdit = async () => {
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

        const result = await netSensorEdit(
            props.USER_TOKEN,
            props.DEVICE_ID,
            props.SENSOR_ID,
            sensorName,
            sensorType
        )

        if(result['CODE'] === CODE.STATUS_FAILED)
        {
            alert("Failed to update sensor information")
            return;
        }
        else
        {
            // Success
            alert("Success to update sensor")
            props.OnClickDialogClose()
        }
    }

    return(
        <div className={"sensor-edit-body"}>
            <ul className={"sensor-edit-content"}>
                <li>
                    <IPlatTitle
                        Title={"Sensor Edit"}
                        FontSize={"30px"}
                        FontColor={COLORS.TEXT}
                    />
                </li>

                <li>
                    <IPlatTextFieldWithHeaderAndFooter
                        Title={"Sensor Name"}
                        Value={sensorName}
                        FontSize={"20px"}
                        FontColor={COLORS.TEXT}
                        FotterTitle={"\n" +
                        "Only lower letters and numbers are available"}
                        HandleChange={(e) => setSensorName(e.target.value)}
                    />
                </li>

                <li>
                    <IPlatTextFieldWithHeader
                        Title={"Sensor Type"}
                        Value={sensorType}
                        FontSize={"20px"}
                        HandleChange={(e) => setSensorType(e.target.value)}
                    />
                </li>

                <li className={"sensor-edit-error-area"}>
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
                    <div className={"sensor-edit-cancel-btn"}>
                        <IPlatButton
                            W={"180px"}
                            H={"50px"}
                            Title={"Cancel"}
                            FontSize={"22px"}
                            OnClick={props.OnClickDialogClose}/>
                    </div>

                    <div className={"sensor-edit-register-btn"}>
                        <IPlatButton
                            W={"180px"}
                            H={"50px"}
                            Title={"Edit"}
                            FontSize={"22px"}
                            OnClick={clickEdit}
                        />
                    </div>
                </li>
            </ul>

        </div>
    )
}

export default IPlatSensorEditPopup;
