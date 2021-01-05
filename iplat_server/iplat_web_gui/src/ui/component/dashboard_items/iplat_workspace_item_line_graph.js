import React from 'react';
import { Line } from "react-chartjs-2";

function IPlatWorkspaceItemLineGraph(props) {
    const minData = props.selectedDataInfo.y ? Math.min(...props.selectedDataInfo.y.map(Number)) : 0
    const maxData = props.selectedDataInfo.y ? Math.max(...props.selectedDataInfo.y.map(Number)) : 0

    const delta = (maxData - minData) * 0.1

    const lineData = {
        labels: props.selectedDataInfo.x,//['1', '2', 'March', 'April', 'May', 'June', 'July', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Value',
                fill: true,

                lineTension: 0.3,       // 그래프 꺽음 기울기
                backgroundColor: 'rgba(75,192,192,0.2)',

                borderWidth: 0.3,
                borderColor: '#00d6b4',
                // borderColor: 'gold',
                // borderCapStyle: 'butt',
                borderDash: [],       // 그래프 점들 사이의 간격otep
                // borderDashOffset: 5.0,
                borderJoinStyle: 'miter',
                pointRadius: 1,     // 포인트 굵기
                pointBorderColor: '#00d6b4',
                // pointBorderColor: 'gold',
                pointBackgroundColor: '#00d6b4',
                // pointBackgroundColor: 'gold',
                // pointBackgroundColor: 'green',

                pointBorderWidth: 0,        // 원의 넓이
                pointHoverRadius: 4,        // 마우스를 올렸을 때의 점의 반지름.
                pointHoverBorderWidth: 1,   // 마우스를 올렸을 때의 경계 너비.
                pointHoverBackgroundColor: 'rgba(75,192,192,1)', // 가리키면 배경색을 가리 킵니다.
                // pointHoverBackgroundColor: 'rgba(255,215,0.1)',// 가리키면 배경색을 가리 킵니다.
                pointHoverBorderColor: '#1f8ef1', // 가리키면 포인트 테두리 색상입니다.
                // pointHoverBorderColor: 'gold', // 가리키면 포인트 테두리 색상입니다.

                // pointHoverBorderColor: 'rgba(220,220,220,1)',

                // pointRadius: 3,
                // pointHitRadius: 20,

                data: props.selectedDataInfo.y,//[100, 59, 70, 81, 56, 95, 70, 56, 95, 70, 56, 95, 70]
            }
        ]
    };

    return(
        <div style={{
            width:'100%',
            height:'100%',

            position:"relative",
            // backgroundColor: 'white',
        }}>
            <div style={{
                color:"white",

                fontSize:"16px",
                position:"absolute",
                top: "10px",
                left: "10px",
                // transform:" translate(-5%, -5%)",
                // backgroundColor:"pink",

            }}>
                {/*props.selectedDataInfo.deviceName + " " + props.selectedDataInfo.sensorName + " " + props.selectedDataInfo.fileName*/}
                <span style={{color:"gold", fontSize:"12px",fontWeight:"bold"}}>Device ID : </span>
                <span>{props.selectedDataInfo.deviceName}</span>
                <br/>
                <span style={{color:"gold", fontSize:"12px",fontWeight:"bold"}}>Sensor ID : </span>
                <span>{props.selectedDataInfo.sensorName}</span>
            </div>

            <div style={{
                width:'95%',
                height:'75%',
                position:"absolute",
                top: "55%",
                left: "50%",
                transform:" translate(-50%, -50%)",
            }}>
                {
                    props.selectedDataInfo.x.length != 0 ?
                        <Line
                            data={lineData}
                            // width={'100px'}
                            // height={'100vh'}
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
                                            color:"white",
                                        },
                                        ticks:{
                                            fontColor: 'white',
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
                                            color:"white",
                                        },

                                        ticks: {
                                            fontSize: 10,
                                            // stepSize: 5,
                                            // min: Math.min.apply(this, props.LINE_GRAPH_DATA),
                                            // max: Math.max.apply(this, props.LINE_GRAPH_DATA) + 5,
                                            //
                                            min: minData - delta,
                                            max: maxData + delta,
                                            fontColor: 'white',
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
                        : null
                }
            </div>

            <div style={{
                color:"white",
                fontSize:"16px",
                position:"absolute",
                bottom: "15px",
                left: "10px",
            }}>
                <span style={{color:"gold", fontSize:"12px",fontWeight:"bold"}}>Start Time :</span>
                <span style={{fontSize:"12px"}}> {props.selectedDataInfo.fileName}</span>
            </div>

        </div>
    )
}

export default IPlatWorkspaceItemLineGraph;
