import React from 'react';
import IPlatSelectBoxItem from "./iplat_select_box_item";

function IPlatSelectBox(props) {

    const menuList = props.Title.map((title, index) => (
        <IPlatSelectBoxItem FontSize={props.FontSize} Title={title} key={index}/>
    ));

    return(
        <select   style={{
            width:props.W,
            height:props.H,

            paddingLeft: props.PaddingLeft,
            paddingRight: props.PaddingRight,

            fontSize:props.FontSize,

            display:"block",

            borderRadius: "8px",
            border: "0px transparent",

            textAlign: "left",
            cursor: "pointer",

            color: props.FontColor,
            backgroundColor: "#333640",
        }} onChange={e => props.OnChange(e)}>
            {menuList}
        </select>
    )
}

export default IPlatSelectBox;
