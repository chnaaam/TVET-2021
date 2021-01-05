import React, {useState} from 'react';
import './css/iplat_openapi_template.css'

import IPlatBoldTitle from "../../component/text/iplat_bold_title";
import IPlatNomalCorpus from "../../component/text/iplat_normal_corpus";
import IPlatTitle from "../../component/text/iplat_title";

function IPlatOpenApiTemplate(props){
    const [isVisible, setVisible] = useState(false);

    const OnClickApiHeader = () => {setVisible(!isVisible)}

    return(
        <div className={"open-api-template-area"}
             onClick={OnClickApiHeader}>
            <div className={"open-api-template"}>
                <div>
                    <div className={"open-api-template-method"}
                         style={{backgroundColor: isVisible ? "#1D8899" : "transparent"}}>
                        {props.ApiMethod}
                    </div>
                </div>

                <div className={"open-api-template-path"}>
                    <IPlatNomalCorpus Title={props.ApiSubUrl}/>
                </div>

                <div>
                    {props.ApiDescription}
                </div>

                <div>
                    JSON
                </div>


            </div>

            <div className={"open-api-template-area"}
                style={{display: isVisible ? 'block' : 'none',}}>
                <div className={"open-api-template-description"}>
                    <span>&bull; 설명</span>
                    <br/>
                    <span>{props.ApiDescription}</span>
                </div>

                <div className={"open-api-template-request-parameters"}>
                    <span>&bull; Request Parameters</span>
                    <br/>
                    <table className={"open-api-template-table"}>
                        <thead>
                            <tr className={"open-api-template-table-tr"}>
                                <th>Parameter</th>
                                <th>Description</th>
                                <th>Data Type</th>
                                <th>Example</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            props.ApiParameter ? props.ApiParameter.map(function(value, idx){
                                return <tr className={"open-api-template-table-tbody-tr"}>
                                    <td>{value.parameter}</td>
                                    <td>{value.description}</td>
                                    <td>{value.data_type}</td>
                                    <td>{value.example}</td>
                                </tr>
                            }) : null
                        }
                        </tbody>
                    </table>
                </div>

                <div className={"open-api-template-response"}>
                    <span>&bull; Response</span>
                    <br/>
                    <div>
                        <span>
                            {String(props.ApiResponse).split("\n").map(i =>
                                <pre>{i}<br/></pre>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export  default  IPlatOpenApiTemplate;
