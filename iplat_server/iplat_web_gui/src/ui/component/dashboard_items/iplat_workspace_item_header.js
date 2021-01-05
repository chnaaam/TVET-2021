import React from 'react';
import X_MARK from '../resources/imgs/X_GOLD.png'

import IPlatIconButton from "../button/iplat_icon_button";

// 이 객체 자체 -  없애도 되는데 나중에 필요할까봐 남겨둠

function IPlatWorkspaceItemHeader(props){
    const splitWidth = (props.itemW);

    return (
        <div style={{
            width: props.itemW,
            height: "40px",
            // backgroundColor: "white",
            position:"relative"

        }}>
            <ul style={{
                height:"100%",
                position:"absolute",
                top:"0",
                left:"0",
                color:"white",
                fontSize:"16px",
                // backgroundColor:"pink",
                padding:"0",
                listStyle:"none",
                lineHeight:"45px"
            }}>
                <li style={{display:"inline-block",marginLeft:"10px",marginRight:"5px"}}>
                    {props.Title ? props.Title : null}
                </li>

                {/*<li style={{display:"inline-block",margin:"0px 5px",}}>*/}
                {/*    test-device2*/}
                {/*</li>*/}

                {/*<li style={{display:"inline-block",margin:"0px 5px",}}>*/}
                {/*    test-device3*/}
                {/*</li>*/}
            </ul>

            <div style={{
                position:"absolute",
                top:"0",
                right:"0",
            }}>
                <div style={{
                    backgroundColor:"orange",
                    width: "50px",
                    height: "40px",
                    lineHeight: "50px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent:"center",
                    alignContent:"center",
                }}>
                    <IPlatIconButton W={"20px"} H={"20px"} Img={X_MARK} OnClick={props.OnClickForRemoveItem}/>
                </div>
            </div>
        </div>
    )
}

export default IPlatWorkspaceItemHeader;
