import React, {useEffect, useState} from 'react';
import REFRESH from '../resources/imgs/REFRESH.png'
import './css/iplat_workspace_item_viewer_one_line.css'

function IPlatWorkspaceItemDataViewerOneLine(props) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            let i = index;

            if(props.selectedDataInfo.y[i + 1] !== undefined)
                i = i + 1;

            setIndex(i);
        }, 1000);

        // clearing interval
        return () => clearInterval(timer);
    });

    return(
        <div style={{
            width:'100%',
            height:'100%',
            position: "relative",
            // backgroundColor:"#2c50ee"
        }}>
            <div style={{
                color:"white",
                fontSize:"12px",
                position:"absolute",
                top: "10px",
                left: "10px",
                // transform:" translate(-5%, -5%)",
                // backgroundColor:"pink",

            }}>
                {/*props.selectedDataInfo.deviceName + " " + props.selectedDataInfo.sensorName + " " + props.selectedDataInfo.fileName*/}
                <span style={{color:"gold", fontSize:"12px", fontWeight:"bold"}}>Device ID : </span>
                <span>{props.selectedDataInfo.deviceName}</span>
                <br/>
                <span style={{color:"gold", fontSize:"12px",fontWeight:"bold"}}>Sensor ID : </span>
                <span>{props.selectedDataInfo.sensorName}</span>
            </div>

            <div style={{
                position:"absolute",
                top: "50%",
                left: "50%",
                transform:" translate(-50%, -50%)",
                display:"block",
                textAlign:" center",
                fontSize:"60px",
                fontWeight:"bold",
                color:"white",
            }}>
                {
                    props.selectedDataInfo.y[index]
                }
            </div>

            <div style={{
                position:"absolute",
                bottom: "10px",
                right: "15px",
            }}>
                <img src={REFRESH} width={"20px"} height={"20px"} onClick={(e) => {
                    setIndex(0);
                }}/>
            </div>

            <div style={{
                color:"white",
                fontSize:"16px",
                position:"absolute",
                bottom: "15px",
                left: "10px",
            }}>
                <span style={{color:"gold", fontSize:"12px",fontWeight:"bold"}}>Start Time:</span>
                <span style={{fontSize:"12px"}}> {props.selectedDataInfo.fileName}</span>
            </div>
        </div>
    )
}

export default IPlatWorkspaceItemDataViewerOneLine;
