import React from 'react';
import './css/iplat_dashboard_widget.css';

import IPlatBoldCorpus from "../../component/text/iplat_bold_corpus";

import {COLORS} from "../../component/resources/iplat_colors";
import IPlatPanelItem from "../../component/dashboard_items/iplat_panel_item";
import IPLAT_LINE_GRAPH from "../../component/resources/imgs/IPLAT_LINE.png";
import IPLAT_DATA_STREAM_LOG from "../../component/resources/imgs/IPLAT_DATA_STREAM_LOG.png";

function IPlatDashboardWidget(props) {
    const IconButtonSize = "42px"

    return(
        <div className={"dsh-panel-body"}>
            <div className={"dsh-panel-container"} >
                <h1 style={{
                    backgroundColor:COLORS.TABLE_BACKGROUND
                }}>
                    <IPlatBoldCorpus
                        Title={props.Title}
                        FontSize={props.FontSize}
                        FontColor={props.FontColor}
                    />
                </h1>
            </div>

            <div style={{
                height: props.H + "px",
                paddingTop:"10px",
                paddingLeft:"10px",
                paddingRight:"10px",
                backgroundColor:COLORS.TABLE_BACKGROUND
                // backgroundColor:"pink"
            }}   className={"dsh-list-item-area"}>
                <IPlatPanelItem W={IconButtonSize} H={IconButtonSize} value={'graph'} Img={IPLAT_LINE_GRAPH} OnClick={props.OnClick} />
                <IPlatPanelItem W={IconButtonSize} H={IconButtonSize} value={'data-viewer-one-line'} Img={IPLAT_DATA_STREAM_LOG} OnClick={props.OnClick} />
            </div>
        </div>
    )
}

export default IPlatDashboardWidget;
