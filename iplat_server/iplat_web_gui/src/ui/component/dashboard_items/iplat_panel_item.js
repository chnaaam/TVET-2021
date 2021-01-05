import React from "react";
import './css/iplat_panel_item.css'

function IPlatPanelItem(props) {
    return(
        <img
            className={"dsh-panel-item"}
            style={{
                width:props.W,
                height:props.H,

                display: "inline-block",
                // margin:"6px 6px",
                margin:"6px 6px",
                padding:"3px",
                cursor: "pointer",

            }}
            src={props.Img} onClick={(e) => {
                props.OnClick(props.value)
            }}>
            {

            }
        </img>
    )
}

export default IPlatPanelItem;
