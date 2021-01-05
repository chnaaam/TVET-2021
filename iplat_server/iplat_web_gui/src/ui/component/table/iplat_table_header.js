import React from "react";

import {COLORS} from "../resources/iplat_colors";

function IPlatTableHeader(props) {
    return(
        <div style={{
            width:props.W,
            height:props.H,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",

            backgroundColor: COLORS.TABLE_HEADER
        }} key={0}>
            {
                props.Header.map((d, i) =>
                    <span style={{
                        fontSize: "12px",
                        color: COLORS.TEXT,

                        flex : props.Weight[i],
                    }} key={i}>
                        {d}
                    </span>
                )
            }
        </div>
    )
}

export default IPlatTableHeader;
