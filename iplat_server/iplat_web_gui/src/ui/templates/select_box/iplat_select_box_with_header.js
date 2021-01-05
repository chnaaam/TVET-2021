import React from 'react';
import IPlatContent from "../../component/text/iplat_content";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatSelectBox from "../../component/select_box/iplat_select_box";
import IPlatTextField from "../../component/text_field/iplat_text_field";

function IPlatSelectBoxWithHeader(props){


    return(
        <ul style={{
            listStyleType:"none",
            padding: "0px 0px",
        }}>
            <li style={{
                marginBottom:"10px"
            }}>
                <IPlatContent
                    Title={props.Title}
                    FontColor={COLORS.TEXT}
                />
            </li>

            <li style={{
                marginTop:"10px"
            }}>
                <IPlatSelectBox
                    Title={props.ItemList}

                    W={"480px"}
                    H={"50px"}

                    PaddingLeft={"16px"}
                    PaddingRight={"16px"}
                    FontSize={props.FontSize}
                    FontColor={"#c0c0c0"}

                    OnChange={props.OnChange}
                />
            </li>
        </ul>
    );
}

export default IPlatSelectBoxWithHeader;
