import React, {useState, useRef, useEffect} from "react";
import './css/iplat_workspace_item.css'
import IPlatWorkspaceItemHeader from "./iplat_workspace_item_header";
import IPlatWorkspaceItemLineGraph from "./iplat_workspace_item_line_graph";
import IPlatWorkspaceItemText from "./iplat_workspace_item_text";
import IPlatWorkspaceItemDataViewerOneLine from "./iplat_workspace_item_data_viewer_one_line";
import X_MARK from "../resources/imgs/X_GOLD.png";
import IPlatIconButton from "../button/iplat_icon_button";

function IPlatWorkspaceItem(props) {
    const [itemTop, setItemTop] = useState(0);
    const [itemLeft, setItemLeft] = useState(0);

    const [itemW, setItemW] = useState(Number(props.W.split("px")[0]));
    const [itemH, setItemH] = useState(Number(props.H.split("px")[0]));
    console.log("Size : ", itemW, itemH)

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [ZIndex, setZIndex] = useState(0);

    const panelWidth = 250;

    const ref = useRef(null)
    const getItemType = (type) => {
        if(type === 'graph')
        {
            return <IPlatWorkspaceItemLineGraph selectedDataInfo={props.selectedDataInfo}/>
        }
        else if(type === 'data-viewer-one-line')
        {
            return <IPlatWorkspaceItemDataViewerOneLine selectedDataInfo={props.selectedDataInfo}/>
        }
        else if(type === 'text')
        {
            return <IPlatWorkspaceItemText/>
        }
    }

    return(
        <div
            ref={ref}
            className={props.IsSelected ?
                "dsh-workspace-no-item"
                :
                "dsh-workspace-item"
            }
            style={{
                top: itemTop + "px",
                left: itemLeft + "px",
                width: itemW + "px",
                height: itemH + "px",

                minWidth : "300px",
                minHeight : "200px",

                // 이하 이후 삭제
                // backgroundColor: "red",
                backgroundColor: props.bgColor,
                display:"absolute",
                zIndex: ZIndex,
            }}

            onMouseDown = {(e => {
                props.OnClickItem(props.itemIdx)

                const mouseMarginX = Math.abs((e.clientX - panelWidth - itemLeft - itemW / 2) * 0.1)
                const mouseMarginY = Math.abs((e.clientY - 60 - itemTop - itemH / 2) * 0.1)

                if (
                    (mouseMarginX < 1 && mouseMarginY < 1) ||   // left top
                    (mouseMarginX < 1 && mouseMarginY > 9) ||   // left bottom
                    (mouseMarginX > 9 && mouseMarginY < 1) ||   // right top
                    (mouseMarginX > 9 && mouseMarginY > 9)      // right bottom
                ){
                    setItemW(ref.current.style.width.split('px')[0]);
                    setItemH(ref.current.style.height.split('px')[0]);
                }
                else{
                    setIsMouseDown(true)
                    setZIndex(999)
                }
            })}

            onMouseMove={(e=>{
                if(isMouseDown)
                {
                    setItemLeft(e.clientX - panelWidth - itemW / 2)
                    setItemTop(e.clientY - 60 - itemH / 2)

                    props.OnChangeWidgetPosition(props.itemIdx, itemLeft, itemTop)
                }
            })}

            onMouseUp = {(e => {
                setIsMouseDown(false)
                setZIndex(0)

                setItemW(ref.current.style.width.split('px')[0]);
                setItemH(ref.current.style.height.split('px')[0]);
            })}>

            {/* 우선 지움 - 2020-08-27 충현*/}
            {/*<IPlatWorkspaceItemHeader*/}
            {/*    itemW={'100%'}*/}
            {/*    Title={*/}
            {/*        props.selectedDataInfo.deviceName + " " + props.selectedDataInfo.sensorName + " " + props.selectedDataInfo.fileName*/}
            {/*    }*/}
            {/*    OnClickForRemoveItem={props.OnClickForRemoveItem}*/}
            {/*/>*/}

            <div style={{
                width: '100%',
                // height: (itemH - 40) + 'px',
                height: (itemH) + 'px',

                // padding:"10px 10px",
                position:"relative",
                // backgroundColor: "blue",
            }}>
                {getItemType(props.itemType)}
            </div>

            <div style={{position:"absolute", top:"15px", right:"15px"}}>
                <IPlatIconButton W={"20px"} H={"20px"} Img={X_MARK} OnClick={(e) => {props.OnClickForRemoveItem(props.itemIdx)}}/>
            </div>

            <div className={props.IsSelected ? "dsh-workspace-selective-item" : "dsh-workspace-no-selective-item"}/>
        </div>
    )
}

export default IPlatWorkspaceItem;
