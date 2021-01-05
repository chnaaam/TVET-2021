import React from 'react';
import {Link, Redirect,} from "react-router-dom";
import {COLORS} from "../component/resources/iplat_colors";
import './css/iplat_board_writting_page.css'

import IPlatNavigation from "../templates/nav_bar/iplat_navigation";
import SAMPLE_IEG_LOGO from "../component/resources/imgs/SAMPLE_IEG_LOGO.png";
import IPlatTextButton from "../component/button/iplat_text_button";

function IPlatArchiveBoardWrittingPageUI(props){
    return (
        <div style={{
            background: COLORS.BACKGROUND,
        }}>
            <IPlatNavigation UserID={props.USER_ID} WindowWidth={props.width} WindowHeight={props.height}
                             ClickLogout={props.clickLogout}/>
            <div className={"board-write-area"}
                 style={{
                     width: props.width,
                     height: "900px",
                     minWidth: "1700px",
                     minHeight: "900px",
                     display: "flex",
                     flexDirection: "col",
                     flexWrap: "wrap",
                     justifyContent: "center",
                     alignContent: "center",
                     overflow: "hidden",

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
                        width: "200px",
                        height: "50px",
                        lineHeight: "50px",
                        color: "gold",
                        fontWeight: "bold",
                        fontSize: "16px",
                        backgroundColor: "#2e313a",
                        marginRight: "10px",
                        textAlign: "center",
                    }}>
                        <span>Title</span>
                    </div>

                    <div style={{
                        width: "100%",
                        height: "50px",
                        lineHeight: "50px",
                        fontSize: "16px",
                    }}>
                        <input
                            style={{
                                // display:"inline-block",
                                height: "100%",
                                width: "100%",
                                backgroundColor: "#272930",
                                color: "white",
                                outlineStyle: "none",
                                borderRadius: "0px 0px",
                                border: "none",
                                padding: "0px 15px"
                            }}
                            type={'text'}
                            placeholder={'Insert title'}
                            required={true}
                            onChange={props.handleChangeTitleField}
                        />
                    </div>
                </div>


                <div style={{
                    marginTop: "30px",
                    width: "70%",
                    height: "600px",
                    // backgroundColor: "brown",
                }}>
                    <div style={{
                        width: "100%",
                        height: "50px",
                        // backgroundColor: "aquamarine",
                    }}>
                        <div style={{
                            display: "inline-block",
                            width: "200px",
                            height: "50px",
                            lineHeight: "50px",
                            color: COLORS.GOLD_TEXT,
                            fontWeight: "bold",
                            fontSize: "16px",
                            backgroundColor: "#2e313a",
                            marginRight: "10px",
                            textAlign: "center",
                        }}>
                            <span>Content</span>
                        </div>

                        <div style={{
                            paddingTop:"20px",
                            float:"right",
                            display:"inline-block",
                            width: "98px",
                            height: "50px",
                            // backgroundColor:"red"
                        }}>
                            {/*<IPlatTextButton*/}
                            {/*    Title={"FILE UPLOAD"}*/}
                            {/*    FontSize={"15px"}*/}
                            {/*    // OnClick={props.OnClickDel}*/}
                            {/*/>*/}
                        </div>
                    </div>

                    <div style={{
                        width: "100%",
                        // height: "550px",
                        height: "500px",
                    }}>
                        <textarea style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#272930",
                            color: "white",
                            outlineStyle: "none",
                            borderRadius: "0px 0px",
                            border: "none",
                            padding: "15px 15px",
                            overflow: "auto"
                        }} placeholder={'Insert Content'}
                                  onresize={"none"} onChange={props.handleChangeContentField}/>
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
                            <form >
                                <label>
                                    <input
                                        type="file"
                                        name="files"
                                        className={"init-input"}
                                        multiple
                                        onChange={props.onChangeUploadFileList}
                                    />
                                </label>
                            </form>
                        </div>
                    </div>
                </div>

                <ul className={"writting-btn"} style={{
                    // backgroundColor:"red"
                }}>
                    <li className={"writting-cancel"}
                        style={{
                            width: "80px",
                        }}>
                        <Link to={'/home'}>
                            <IPlatTextButton Title={"CANCEL"} FontSize={"16px"}/>
                        </Link>
                    </li>

                    <li style={{
                        // width:"60px",
                    }}>
                        <IPlatTextButton Title={"SAVE"} FontSize={"16px"} OnClick={props.registerNoticeBoard}/>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default IPlatArchiveBoardWrittingPageUI;
