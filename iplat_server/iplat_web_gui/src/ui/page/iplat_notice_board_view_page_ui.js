import React from 'react';

import {COLORS} from "../component/resources/iplat_colors";
import './css/iplat_board_writting_page.css'

import IPlatNavigation from "../templates/nav_bar/iplat_navigation";
import SAMPLE_IEG_LOGO from "../component/resources/imgs/SAMPLE_IEG_LOGO.png";
import IPlatTextButton from "../component/button/iplat_text_button";
import {Link, NavLink, Redirect} from "react-router-dom";

function IPlatNoticeBoardViewPageUI(props){
    return (
        <div style={{
            background:COLORS.BACKGROUND,
        }}>
            <IPlatNavigation UserID={props.USER_ID} WindowWidth={props.width} WindowHeight={props.height} ClickLogout={props.clickLogout}/>
            <div className={"board-write-area"}
                style={{
                width:props.width,
                height: "900px",
                minWidth: "1700px",
                minHeight: "900px",
                display:"flex",
                flexDirection:"col",
                flexWrap:"wrap",
                justifyContent:"center",
                alignContent:"center",
                overflow:"hidden",

                backgroundImage: `url(${SAMPLE_IEG_LOGO})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // backgroundColor:"orange"
            }}>

                <div style={{
                    width: "70%",
                    // backgroundColor: "aquamarine",
                }}>
                    <div style={{
                        width:"200px",
                        height:"50px",
                        lineHeight:"50px",
                        color:"gold",
                        fontWeight:"bold",
                        fontSize:"16px",
                        backgroundColor:"#2e313a",
                        marginRight:"10px",
                        textAlign:"center",
                    }}>
                        <span>Title</span>
                    </div>

                    <div style={{
                        width:"100%",
                        height:"50px",
                        lineHeight:"50px",
                        fontSize:"16px",

                    }}>
                        <input
                            style={{
                                // display:"inline-block",
                                height:"100%",
                                width: "100%",
                                backgroundColor:"#272930",
                                color:"white",
                                outlineStyle:"none",
                                borderRadius: "0px 0px",
                                border:"none",
                                padding:"0px 15px"
                            }}
                            type={'text'}
                            placeholder={'Insert title'}
                            required={true}
                            readOnly
                            value={props.TITLE}

                        />
                    </div>
                </div>


                <div style={{
                    marginTop:"30px",
                    width: "70%",
                    height:"600px",
                    // backgroundColor: "brown",
                }}>
                    <div style={{
                        width: "100%",
                        height:"50px",
                        // backgroundColor: "aquamarine",
                    }}>
                        <div style={{
                            display:"block",
                            width:"200px",
                            height:"50px",
                            lineHeight:"50px",
                            color:"gold",
                            fontWeight:"bold",
                            fontSize:"16px",
                            backgroundColor:"#2e313a",
                            marginRight:"10px",
                            textAlign:"center",
                        }}>
                            <span>Content</span>
                        </div>
                    </div>

                    <div style={{
                        width: "100%",
                        // height:"550px",
                        height:"500px",
                    }}>
                        <textarea style={{
                            width:"100%",
                            height:"100%",
                            color:"white",
                            backgroundColor:"#272930",
                            outlineStyle:"none",
                            borderRadius: "0px 0px",
                            border:"none",
                            padding:"15px 15px",
                            overflow:"auto"

                        }} onresize readOnly value={props.CONTENT}/>
                    </div>
                    <div style={{
                        width: "100%",
                        height: "50px",
                        borderTop:"3px solid #2E313A",
                        borderBottom:"3px solid #2E313A",
                        // backgroundColor:"pink"
                        backgroundColor:"#272930"
                    }}>
                        <div style={{
                            // width: "80%",
                            width: "100%",
                            height: "50px",
                            lineHeight:"50px",
                            paddingLeft:"20px",
                            display:"inline-block",
                            color:COLORS.TEXT,
                            // backgroundColor:"pink"
                        }}>
                            {
                                props.FILE_LIST ? Object.values(props.FILE_LIST).map((d, i) => {
                                    return <IPlatTextButton
                                        Title={d}
                                        OnClick={(e) => {props.OnClickDownloadFile(d)}}
                                    />
                                }) : null
                            }
                        </div>
                    </div>
                </div>

                <ul className={"writting-btn"}>
                    {
                        props.isWriterOK ? <li className={"writting-cancel"}
                                               style={{
                                                   width:"50px",
                                                   // backgroundColor:"pink"
                                               }}>
                            <IPlatTextButton Title={"DEL"} FontSize={"16px"} OnClick={props.OnClickDel}/>
                        </li> : null
                    }
                    <li style={{}}>
                        <Link to={'/home'}>
                            <IPlatTextButton Title={"LIST"} FontSize={"16px"} OnClick={props.registerFreeBoard}/>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default IPlatNoticeBoardViewPageUI;
