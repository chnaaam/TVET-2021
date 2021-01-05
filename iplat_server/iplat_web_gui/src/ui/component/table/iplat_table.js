import React, {useState, useEffect} from "react";
import "./css/iplat_table.css"

import IPlatTableHeader from "./iplat_table_header";
import IPlatTableItem from "./iplat_table_item";
import {COLORS} from "../resources/iplat_colors";

function IPlatTable(props) {
    const tableHeader = <IPlatTableHeader Header={props.Header} Weight={props.Weight}/>
    const tableItemH = String(Number(String(props.H).split("px").join("")) - 20) + "px"
    const [selectedItem, setSelectedItem] = useState(0)

    useEffect(() => {
        // useEffect
        // - Hook 개념으로 Component가 Update된 경우 호출될 수 있게 함
        // - props.Value의 값이 변화된다면 수행함
        // - 변화되면 다시 테이블의 맨 앞에 있는 아이템을 호출
        setSelectedItem(0)
    }, [props.Value])

    const OnSelected = (e) => {
        setSelectedItem(e)
    }

    return(
        <div style={{width:props.W,height:props.H,}}>
            {tableHeader}
            <ul className="example"
                style={{height: tableItemH,
                }}>
                {
                    props.Data && props.Value ? props.Data.map((d, i) => {
                        // console.log(props.isAlives ? props.isAlives[i] : null);
                        const item = <IPlatTableItem
                            IsRightAlign={props.IsRightAlign}
                            W={props.W}
                            Index={i}
                            Data={d}
                            Value={props.Value[i]}
                            OnItemClick={props.OnItemClick}
                            OnSelected={OnSelected}
                            SelectedValue={selectedItem === i ? COLORS.TABLE_ITEM_CLICK : null}
                            isAlives={props.isAlives ? props.isAlives[i] : null}
                        />

                        return item;
                    }) : null
                }
            </ul>
        </div>
    )
}
export default IPlatTable;
