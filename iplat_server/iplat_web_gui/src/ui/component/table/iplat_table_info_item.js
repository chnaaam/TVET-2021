import React from 'react';
import {COLORS} from "../resources/iplat_colors";

function IPlatTableInfoItem(props) {

    return(
        <div style={{
            width:"100%",
            height:props.H,

            // backgroundColor:"orange",

            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",

            borderBottom:"1px solid #4e5163"
        }} key={props.Index}>
            <div style={{
                width:"50%",
                height:props.H,
                paddingLeft:"10px",
                color:COLORS.TEXT,
                textAlign: "left",
                display:"inline-block",
                // backgroundColor:"blue",


            }}>
                <span style={{
                    fontSize:"12px",
                    lineHeight:props.H,
                }}>
                    {props.Data}
                </span>
            </div>

            <div style={{
                width:"50%",
                height:props.H,

                paddingRight:"10px",

                color:COLORS.TEXT,
                textAlign: "right",
                display:"inline-block",
                // userSelect: "text",
                // backgroundColor:"red",
            }}>
                <span style={{
                    fontSize:"12px",
                    lineHeight:props.H,
                }}>
                    {props.Value}
                </span>
            </div>
        </div>
    )
}

export default IPlatTableInfoItem;
