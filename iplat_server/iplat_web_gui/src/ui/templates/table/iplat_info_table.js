import React, {useState} from 'react';
import './css/iplat_info_table.css';

import IPlatTable from "../../component/table/iplat_table";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatBoldTitle from "../../component/text/iplat_bold_title";
import IPlatTableInfoItem from "../../component/table/iplat_table_info_item";
import IPlatTableItem from "../../component/table/iplat_table_item";
import IPlatTextButton from "../../component/button/iplat_text_button";


function IPlatInfoTable(props) {

    const CalItemHs = String(Number(props.H)- Number("30"))+"px"
    const [isSelected, setIsSelected] = useState(true)

    const headerWidth = "190px"

    return(
       <div className={"info-table-body"}>
           <div className={"info-table-container"}>
                <h1 style={{backgroundColor:COLORS.TABLE_BACKGROUND}}>
                    <IPlatBoldTitle
                        FontSize={props.FontSize}
                        FontColor={props.FontColor}
                        Title={props.Title}
                    />
                </h1>

               <div className={"info-table-text-button"}>
                   <ul>
                       <li>
                           <IPlatTextButton
                               Title={"EDIT"}
                               OnClick={props.OnClickEdit}
                           />
                       </li>
                   </ul>
               </div>
            </div>

           <div className={"info-table-content"} style={{ width:props.W, height:CalItemHs, backgroundColor:COLORS.TABLE_BACKGROUND,}}>
               {
                   props.Data && props.Value ? props.Data.map((d, i) => {
                       return <IPlatTableInfoItem
                           W={props.W}
                           H={"23px"}
                           Index={i}
                           Data={props.Data[i]}

                           Value={props.IsState ? (props.IsState=="on"? "on": "off")  : props.Value[i]}
                           OnItemClick={(e) => {
                               setIsSelected(true)
                               props.OnItemClick()
                           }}
                           OnItemClickColorChange = {isSelected}
                       />
                   }) : null
               }
           </div>
       </div>
    )
}

export default IPlatInfoTable;
