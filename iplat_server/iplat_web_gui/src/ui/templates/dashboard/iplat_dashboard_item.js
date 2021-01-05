import React, {useEffect} from 'react';

function IPlatDashboardItem(props){

    useEffect(() => {
        console.log(props.Top, props.Left)
    })

    return (
        <div style={{
            width: "100px",
            height: "100px",
            top: props.Top,
            left: props.Left,
            position: "relative",
            backgroundColor: !props.IsSelected ? "yellow" : "black",
        }}
             key={props.itemIdx}
             onClick={(event => {
                 event.stopPropagation()
                 event.target.style.backgroundColor = 'black'

                 props.OnClick(props.itemIdx)
             })}

             onMouseMove={(event => {
                 // console.log("Client : ", event.clientX, event.clientY)
                 event.target.style.backgroundColor = 'blue'
                 props.OnMouseMove({
                     "IDX" : props.itemIdx,
                     "MOUSE_X" : event.clientX,
                     "MOUSE_Y" : event.clientY
                 })
             })}
        >
            {
                console.log(props.Top, props.Left)
                // props.IsSelected == true ?
                //     <div>
                //         <div style={{
                //             width: "10px",
                //             height: "10px",
                //             position: "absolute",
                //             top: "0",
                //             left: "0",
                //             borderTop: "3px solid gray",
                //             borderLeft: "3px solid gray",
                //         }}/>
                //
                //         <div style={{
                //             width: "10px",
                //             height: "10px",
                //             position: "absolute",
                //             top: "0",
                //             right: "0",
                //             borderTop: "3px solid gray",
                //             borderRight: "3px solid gray",
                //         }}/>
                //
                //         <div style={{
                //             width: "10px",
                //             height: "10px",
                //             position: "absolute",
                //             bottom: "0",
                //             left: "0",
                //             borderBottom: "3px solid gray",
                //             borderLeft: "3px solid gray",
                //         }}/>
                //
                //         <div style={{
                //             width: "10px",
                //             height: "10px",
                //             position: "absolute",
                //             bottom: "0",
                //             right: "0",
                //             borderBottom: "3px solid gray",
                //             borderRight: "3px solid gray",
                //         }}/>
                //     </div>
                //     :
                //     null
            }

        </div>
    )
}

export default IPlatDashboardItem;
