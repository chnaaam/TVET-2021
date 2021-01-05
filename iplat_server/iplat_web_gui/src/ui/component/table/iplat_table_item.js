import React, {useState} from "react";
import './css/iplat_table_item.css'

import {COLORS} from "../resources/iplat_colors";

function IPlatTableItem(props) {
    const item = <div className={"table-item"} style={
        {
            width:props.W,
            display:"flex",
            justifyContent: props.IsRightAlign ? "flex-end" : "flex-start",
            // backgroundColor:"pink"
        }}>
            {props.Data}
        </div>

    return(
        <li
            className={props.SelectedValue ? '_focus' : 'table-item-content'}
            style={{
                boxSizing: "content-box", height:"20px",
                position:"relative"
                }}
            key={props.Index} data-id={props.Value}

            onClick={(e) => {
                props.OnSelected(props.Index)

                if(props.OnItemClick) {
                    props.OnItemClick(e)
                }
            }}>
                {props.Data ? item : null}

                {
                    props.isAlives ? <div style={{
                        width:"8px",
                        height:"8px",
                        borderRadius:"50%",
                        position:"absolute",
                        top:"6px",
                        right :"10px",
                        backgroundColor: "#ffd700",
                    }}/> : null
                }


        </li>
    )
}

export default IPlatTableItem;
