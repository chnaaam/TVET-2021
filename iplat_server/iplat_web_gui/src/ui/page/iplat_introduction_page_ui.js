import React from 'react';
import './css/iplat_introduction_page_backup.css'
import '../component/table/css/iplat_table.css'

import IPlatNavigation from "../templates/nav_bar/iplat_navigation";
import {COLORS} from "../component/resources/iplat_colors";

import {Link, Redirect,} from "react-router-dom";
import ATTACHING_FILE from "../component/resources/imgs/IPLAT_ATTACHING_FILE.png";
import SAMPLE_IEG_LOGO_BOLD from "../component/resources/imgs/SAMPLE_IEG_LOGO_BOLD.png";
import BANNER from "../component/resources/imgs/BANNER.jpg";
import IPlatTextButton from "../component/button/iplat_text_button";

function IPlatIntroductionPageUI(props){
    return(
        <div style={{background:COLORS.BACKGROUND,}}>

            <IPlatNavigation UserID={props.USER_ID}/>

                <div style={{
                    marginTop:"20px",
                    width:props.width, minWidth: "1700px",
                    minHeight: "180px",height:"180px",
                    display:"flex", justifyContent:"center",
                }}>
                    <img style={{ display:"block", width:"65%", height:"100%"}} src={BANNER} />
                </div>

            <div className={"intro-page-area"} style={{width:props.width}}>

                <div  className={"intro-page-header"}>

                    <div>
                        Welcome to <span style={{color:"cyan", fontSize:"18px",fontWeight:"bold"}}>i-PLAT</span> ! <br/>
                        A Secure and Stable IoT Platform  <span style={{display:"none", color:"orange", fontSize:"18px",fontWeight:"bold"}}>from IEG co. Ltd,</span><br/>
                        supporting a Novel Realtime Monitoring for Smart Manufacturing Environment.
                    </div>

                    <div className={"intro-page-user-info"} style={{ fontSize:"16px", fontWeight:"normal",}}>

                        <div> User ID : </div>
                        <div> {props.UserName} </div>

                        <div> Your Devices : </div>
                        <div> {props.DeviceNumber} </div>

                        <div> Your Sensors : </div>
                        <div>{props.SensorNumber}</div>
                    </div>

                </div>

                <div className={"intro-page-board-area"}>
                    <div>
                        <div className={"intro-page-free-board-area"}>
                            <div className={"intro-page-free-board-btn"}>

                                <div style={{ color:"white", fontWeight:"bold", fontSize:"14px", paddingLeft:"10px",height:"30px"}}>
                                    Notice Board
                                </div>

                                <ul style={{ listStyle:"none", padding: "0"}}>
                                    {
                                        props.isManager ?
                                            <li style={{display:"inline-block"}}>
                                                <div className={"write-notice-board-header"}>
                                                    <Link to={"/notice_board_writting"}>
                                                        <IPlatTextButton Title={"WRITE"}/>
                                                    </Link>
                                                </div>
                                            </li> : null
                                    }

                                    <li style={{display:"inline-block"}}>

                                        <div className={"notice-board-header"}>
                                            <IPlatTextButton
                                                Title={"<"}
                                                W={"30px"}
                                                FontSize={"13px"}
                                                FontColor={COLORS.TEXT}
                                                OnClick={props.OnClickNoticeBoardContentPrevious}/>
                                        </div>

                                    </li>

                                    <li style={{display:"inline-block"}}>

                                        <div className={"last-notice-board-header"}>
                                            <IPlatTextButton
                                                Title={">"}
                                                W={"30px"}
                                                FontSize={"13px"}
                                                FontColor={COLORS.TEXT}
                                                OnClick={props.OnClickNoticeBoardContentNext}/>
                                        </div>

                                    </li>

                                </ul>

                            </div>

                            <div style={{marginLeft:"2px"}}>

                                <table className={"intro-page-board-notice-table"}>

                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Title</th>
                                            <th>Writer</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        props.NoticeBoardList ?

                                            Object.values(props.NoticeBoardList).map(function(value){
                                            return <tr onClick={(e) => props.OnClickNoticeBoardItem(value.no)}>

                                                    <td>{value.no}</td>

                                                    <td>
                                                        <div style={{
                                                            display:"inline-block", maxWidth:"250px",
                                                            height:"20px", overflow:"hidden",
                                                            whiteSpace:"nowrap", textOverflow:"ellipsis",
                                                            fontSize:"12px", lineHeight:"25px"}}>

                                                            {value.title}

                                                        </div>

                                                        <div style={{display:"inline-block", height:"20px", lineHeight:"25px"}}> &nbsp;&nbsp;
                                                            {
                                                                value.uploaded_file ?
                                                                    <img src={ATTACHING_FILE} style={{width:"9px",}}/>
                                                                    :
                                                                    null
                                                            }
                                                        </div>

                                                    </td>

                                                    <td>{value.writer}</td>

                                                    <td>{value.registered_date}</td>
                                            </tr>
                                        })
                                                :
                                            null
                                    }

                                    </tbody>

                                </table>

                            </div>
                        </div>


                        <div className={"intro-page-free-board-area"}>
                            <div className={"intro-page-free-board-btn"}>

                                <div style={{color:"white", fontWeight:"bold",fontSize:"14px", paddingLeft:"10px",height:"30px",}}>
                                    Free Board
                                </div>

                                <ul style={{listStyle:"none",padding: "0"}}>

                                    <li style={{display:"inline-block"}}>

                                        <div className={"write-notice-board-header"}>
                                            <Link to={"/free_board_writting"}>
                                                <IPlatTextButton Title={"WRITE"}/>
                                            </Link>
                                        </div>

                                    </li>

                                    <li style={{display:"inline-block"}}>

                                        <div className={"notice-board-header"}>
                                            <IPlatTextButton
                                                Title={"<"}
                                                W={"30px"}
                                                FontSize={"13px"}
                                                FontColor={COLORS.TEXT}
                                                OnClick={props.OnClickFreeBoardContentPrevious}/>
                                        </div>

                                    </li>

                                    <li style={{display:"inline-block"}}>

                                        <div className={"last-notice-board-header"}>
                                            <IPlatTextButton
                                                Title={">"}
                                                W={"30px"}
                                                FontSize={"13px"}
                                                FontColor={COLORS.TEXT}
                                                OnClick={props.OnClickFreeBoardContentNext}/>
                                        </div>

                                    </li>
                                </ul>

                            </div>

                            <div style={{ marginLeft:"2px"}}>

                                <table className={"intro-page-free-board-table"}>

                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Title</th>
                                            <th>Writer</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody style={{height:"290px"}}>
                                    {
                                        props.FreeBoardList ? Object.values(props.FreeBoardList).map(function(value){
                                            return <tr onClick={(e) => props.OnClickFreeBoardItem(value.no)}>
                                                <td>{value.no}</td>

                                                <td>
                                                    <div style={{
                                                        display:"inline-block", maxWidth:"250px",
                                                        height:"20px", overflow:"hidden",
                                                        whiteSpace:"nowrap", textOverflow:"ellipsis",
                                                        fontSize:"12px", lineHeight:"25px"
                                                    }}>
                                                        {value.title}
                                                    </div>

                                                    <div style={{display:"inline-block", height:"20px",lineHeight:"25px"}}> &nbsp;&nbsp;
                                                        {
                                                            value.uploaded_file ?

                                                                <img src={ATTACHING_FILE} style={{width:"9px",}}/>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </td>

                                                <td>{value.writer}</td>

                                                <td>{value.registered_date}</td>

                                            </tr>
                                        })
                                            :
                                            null
                                    }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width:props.width, height:"100px", display:"flex", justifyContent:"center", minWidth: "1700px",minHeight: "100px"}}>
                <img src={SAMPLE_IEG_LOGO_BOLD} height={"35px"}/>
            </div>

        </div>
    )
}

export default IPlatIntroductionPageUI;
