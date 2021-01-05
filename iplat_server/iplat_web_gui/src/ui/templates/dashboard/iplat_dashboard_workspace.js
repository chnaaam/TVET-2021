import React, {useEffect, useRef, useState} from 'react';
import "./css/iplat_dashboard_workspace.css"
import IPlatWorkspaceItem from "../../component/dashboard_items/iplat_workspace_item";

function IPlatDashboardWorkspace(props){
    return (
        <div className={"dah-workspace"}>
            {
                props.WorkSpaceItems ? props.WorkSpaceItems.map(function(item){
                    console.log("Test : ", item.idx, item.type, item.position.left, item.position.top)
                    return <IPlatWorkspaceItem
                        // bgColor={"white"}
                        // bgColor={"#232429"}
                        bgColor={"#1b1e24"}
                        W={item.size.width}
                        H={item.size.height}
                        itemType={item.type}
                        itemIdx={item.idx}
                        Top={item.position.top}
                        Left={item.position.left}
                        OnClickItem={(e) => props.OnClickItem(e)}
                        selectedDataInfo={item.data}
                        IsSelected={props.selectedItemIdx == item.idx ? true : false}
                        OnClickForRemoveItem={props.OnClickForRemoveItem}
                        OnChangeWidgetPosition={props.OnChangeWidgetPosition}
                    />
                }) : null
            }
        </div>
    )
}

export default IPlatDashboardWorkspace;
