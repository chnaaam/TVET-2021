import React from 'react';
import IPlatNavigation from "../templates/nav_bar/iplat_navigation";
import {Link, Redirect} from "react-router-dom";
import IPlatTextButton from "../component/button/iplat_text_button";
import {COLORS} from "../component/resources/iplat_colors";
import ATTACHING_FILE from "../component/resources/imgs/IPLAT_ATTACHING_FILE.png";

import './css/iplat_archive.css'
// import '../component/table/css/iplat_table.css'

function IPlatArchivePageUI(props){
    return(
        <div>
            <IPlatNavigation UserID={props.USER_ID} ClickLogout={props.clickLogout}/>

            <div style={{
                width:"100vw",
                height: "100vh",
                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                justifyContent:"center",
                // backgroundColor:"pink"
            }}>
                <div style={{
                    margin:"20px",
                    width:"960px",
                    // backgroundColor:"greenyellow",
                }}>
                    <div className={"intro-page-free-board-btn"}>
                        <div style={{
                            color:"white",
                            fontWeight:"bold",
                            fontSize:"14px",
                            paddingLeft:"10px",
                            height:"30px",
                        }}>
                            Archive Board
                        </div>

                        <ul style={{
                            listStyle:"none",
                            padding: "0",
                            // backgroundColor:"pink",
                        }}>
                            {
                                props.isManager ? <li style={{
                                    display:"inline-block",

                                }}>
                                    <div className={"write-archive-board-header"}>
                                        <Link to={"/archive_writting"}>
                                            <IPlatTextButton Title={"WRITE"}/>
                                        </Link>
                                    </div>
                                </li> : null
                            }

                            <li style={{
                                display:"inline-block",
                            }}>
                                <div className={"archive-board-header"}>
                                    <IPlatTextButton
                                        Title={"<"}
                                        W={"30px"}
                                        FontSize={"13px"}
                                        FontColor={COLORS.TEXT}
                                        OnClick={props.OnClickNoticeBoardContentPrevious}/>
                                </div>
                            </li>

                            <li style={{
                                display:"inline-block"
                            }}>
                                <div className={"last-archive-board-header"}>
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

                    <div
                        style={{
                            marginLeft:"2px",
                            // backgroundColor:"yellow"
                        }}>
                        <table className={"archive-notice-table"}>
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
                                props.ArchiveList ? Object.values(props.ArchiveList).map(function(value){
                                    return <tr onClick={(e) => props.OnClickArchivedItem(value.no)}>
                                        <td>{value.no}</td>
                                        <td>
                                            <div style={{
                                                display:"inline-block",
                                                // backgroundColor:"red",
                                                maxWidth:"250px",
                                                height:"20px",
                                                overflow:"hidden",
                                                whiteSpace:"nowrap",
                                                textOverflow:"ellipsis",
                                                fontSize:"12px",
                                                lineHeight:"25px"
                                            }}>
                                                {value.title}
                                            </div>
                                            <div style={{
                                                display:"inline-block",
                                                // backgroundColor:"blue",
                                                height:"20px",
                                                lineHeight:"25px"

                                            }}> &nbsp;&nbsp;
                                                {
                                                    value.uploaded_file ?
                                                        <img src={ATTACHING_FILE} style={{
                                                            width:"9px",
                                                        }}/>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </td>
                                        <td>{value.writer}</td>
                                        <td>{value.registered_date}</td>
                                    </tr>
                                }) : null
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IPlatArchivePageUI;
