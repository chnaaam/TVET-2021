import React from 'react';
import IPlatContent from "../../component/text/iplat_content";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatTextField from "../../component/text_field/iplat_text_field";
import IPlatLimitSentence from "../../component/text/iplat_limit_sentence";

function IPlatTextFieldWithHeaderAndFooter(props){

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
                marginTop:"10px",
                marginBottom:"10px"
            }}>
                <IPlatTextField
                    Type={"text"}
                    PlaceHolder={"Name"}
                    Value={props.Value}
                    W={"480px"}
                    H={"50px"}

                    BgColor={"#333640"}
                    FontSize={props.FontSize}

                    HandleChange={props.HandleChange}
                />
            </li>

            <li style={{
                marginTop:"10px",
            }}>
                <IPlatLimitSentence
                    Title={props.FotterTitle}
                    ItemList={props.ItemList}
                />
            </li>
        </ul>
    );
}

export default IPlatTextFieldWithHeaderAndFooter;
