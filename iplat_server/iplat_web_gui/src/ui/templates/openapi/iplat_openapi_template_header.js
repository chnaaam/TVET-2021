import React from 'react';
import './css/iplat_openapi_template_header.css';
import IPlatBoldTitle from "../../component/text/iplat_bold_title";

function IPlatOpenApiTemplateHeader(props){
    return(
        <div className={"open-api-template-header-area"}>
            <div>
                <IPlatBoldTitle Title={"Method"} FontSize={"14px"} />
            </div>

            <div>
                <IPlatBoldTitle Title={"URI"} FontSize={"14px"} />
            </div>

            <div>
                <IPlatBoldTitle Title={"Description"} FontSize={"14px"} />
            </div>

            <div>
                <IPlatBoldTitle Title={"Return Type"} FontSize={"14px"} />
            </div>
        </div>
    )
}

export  default  IPlatOpenApiTemplateHeader;
