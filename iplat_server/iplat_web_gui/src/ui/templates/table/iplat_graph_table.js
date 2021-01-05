import React from 'react';
import './css/iplat_graph_table.css'

import IPlatTable from "../../component/table/iplat_table";
import {COLORS} from "../../component/resources/iplat_colors";
import IPlatBoldTitle from "../../component/text/iplat_bold_title";
import IPlatTextButton from "../../component/button/iplat_text_button";

import { Line } from "react-chartjs-2";
import IPlatTitle from "../../component/text/iplat_title";

function IPlatGraphTable(props) {

    const CalItemHs = String(Number(props.H) - Number("30"))+"px"
    const minData = Math.min(...props.LINE_GRAPH_DATA.map(Number))
    const maxData = Math.max(...props.LINE_GRAPH_DATA.map(Number))

    const delta = (maxData - minData) * 0.1

    const lineData = {
        labels: props.LINE_GRAPH_LABELS,//['1', '2', 'March', 'April', 'May', 'June', 'July', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Value',
                fill: true,

                lineTension: 0.3,       // 그래프 꺽음 기울기
                backgroundColor: 'rgba(75,192,192,0.1)',

                borderWidth: 0.3,
                borderColor: '#00d6b4',
                // borderCapStyle: 'butt',
                borderDash: [],       // 그래프 점들 사이의 간격otep
                // borderDashOffset: 5.0,
                borderJoinStyle: 'miter',
                pointRadius: 1,     // 포인트 굵기
                pointBorderColor: '#00d6b4',
                pointBackgroundColor: '#00d6b4',
                // pointBackgroundColor: 'green',

                pointBorderWidth: 0,        // 원의 넓이
                pointHoverRadius: 4,        // 마우스를 올렸을 때의 점의 반지름.
                pointHoverBorderWidth: 1,   // 마우스를 올렸을 때의 경계 너비.
                pointHoverBackgroundColor: 'rgba(75,192,192,1)', // 가리키면 배경색을 가리 킵니다.
                pointHoverBorderColor: '#1f8ef1', // 가리키면 포인트 테두리 색상입니다.

                // pointHoverBorderColor: 'rgba(220,220,220,1)',

                // pointRadius: 3,
                // pointHitRadius: 20,

                data: props.LINE_GRAPH_DATA,//[100, 59, 70, 81, 56, 95, 70, 56, 95, 70, 56, 95, 70]
            }
        ]
    };


    return(
        <div className={"graph-text-body"}>
            <div className={"graph-text-container"}>
                <h1 style={{backgroundColor:COLORS.TABLE_BACKGROUND}}>
                    <IPlatBoldTitle
                        FontSize={props.FontSize}
                        FontColor={props.FontColor}
                        Title={props.Title}
                    />
                </h1>

                <div className={"graph-text-container-text-button-area"}>
                    <ul>
                        <li>
                            <div className={"back-button"} style={{visibility: props.IsRealTime ? "visible" : "hidden" ,}}>
                                <IPlatTextButton
                                    Title={"<"}
                                    W={"30px"}
                                    FontSize={"13px"}
                                    FontColor={COLORS.TEXT}
                                    OnClick={props.OnClickContentsPrevious}
                                />
                            </div>
                        </li>

                        <li>
                            <div className={"next-button"} style={{visibility: props.IsRealTime ? "visible" : "hidden",}}>
                                <IPlatTextButton
                                    Title={">"}
                                    W={"30px"}
                                    FontSize={"13px"}
                                    FontColor={COLORS.TEXT}
                                    OnClick={props.OnClickContentsNext}
                                />
                            </div>
                        </li>
                        <li className={"zoom-out-button"}>
                            <IPlatTextButton
                                Title={"ZOOM OUT"}
                                W={"85px"}
                                FontSize={"13px"}
                                FontColor={COLORS.TEXT}
                                OnClick={props.OnClickContentsZoomOut}
                            />
                        </li>
                        <li className={"zoom-in-button"}>
                            <IPlatTextButton
                                Title={"ZOOM IN"}
                                W={"75px"}
                                FontSize={"13px"}
                                FontColor={COLORS.TEXT}
                                OnClick={props.OnClickContentsZoomIn}
                            />
                        </li>
                    </ul>
                </div>
            </div>


            <div className={"graph-text-content-area"} style={{backgroundColor:COLORS.TABLE_BACKGROUND}}>
                <div className={"graph-area"}>
                    <div>
                        <div className={"text-area"}>
                            <IPlatTable
                                W={"55px"}
                                H={"355px"}
                                Header={[""]}
                                Data={props.LINE_GRAPH_DATA}
                                Value={props.LINE_GRAPH_LABELS}
                                Weight={[1]}
                                IsRightAlign={true}
                                // OnItemClick={props.OnItemClick}
                            />
                        </div>

                        <div className={"graph-explain"}>
                            <div>
                                <IPlatTitle
                                    Title={props.LINE_GRAPH_FIRST_TIME_STAMP ? "Start Time : " + props.LINE_GRAPH_FIRST_TIME_STAMP : null}
                                    FontColor={COLORS.TEXT}
                                    FontSize={"12px"}
                                />
                            </div>
                        </div>

                        <div className={"graph-draw-area"}>
                            {
                                props.LINE_GRAPH_LABELS.length != 0 ?
                                    <Line data={lineData}
                                          width={1100}
                                          height={400}
                                          redraw  // 데이터가 들어오면 Update되는 명령어
                                          options={{

                                              animation: {
                                                  duration: 0
                                              },
                                              maintainAspectRatio: false,
                                              legend: {
                                                  display: false,     // label 표시 여부
                                                  labels: {
                                                      // fontColor: 'orange'
                                                  }
                                                  // position: "right"
                                              },
                                              tooltips: {
                                                  mode: 'x-axis', // x-axis(x기준),point(해당 점)
                                                  intersect: false,

                                              },
                                              responsive: true,
                                              scales: {

                                                  xAxes: [{
                                                      gridLines: {
                                                          display: true,
                                                          drawBorder:true,
                                                          drawOnChartArea:false,
                                                          drawTicks:false,
                                                          color:"gray",
                                                      },
                                                      ticks:{
                                                          fontColor: '#87888b',
                                                          fontSize: 10,
                                                          lineHeight: 4,

                                                      },
                                                      stacked: true,
                                                  }],
                                                  yAxes: [{
                                                      padding: 20,
                                                      gridLines: {
                                                          display: true,
                                                          drawBorder:true,
                                                          drawOnChartArea:false,
                                                          drawTicks:false,
                                                          color:"gray",
                                                      },

                                                      ticks: {
                                                          fontSize: 10,
                                                          // stepSize: 5,
                                                          // min: Math.min.apply(this, props.LINE_GRAPH_DATA),
                                                          // max: Math.max.apply(this, props.LINE_GRAPH_DATA) + 5,
                                                          //
                                                          min: minData - delta,
                                                          max: maxData + delta,
                                                          fontColor: '#87888b',
                                                          // beginAtZero: true,
                                                          // maxTicksLimit:11,   // 기본 11 - 표시 할 최대 눈금 및 눈금 선 수
                                                          // lineWidth:30,
                                                          // lineHeight: 4,
                                                          lineWidth: 100,
                                                          padding: 10,
                                                          // suggestedMin: 20,   // 최소 눈금
                                                          // suggestedMax: 140,  // 최대 눈금

                                                          // stepSize: stepSize(props.LINE_GRAPH_DATA)        // 눈금 간격
                                                      },
                                                      // stacked: false          // 자동으로 눈금 조절
                                                  }]
                                              }
                                          }}/>
                                          :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IPlatGraphTable;
