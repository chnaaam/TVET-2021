import React, {useState} from 'react';
import { Line } from "react-chartjs-2";

function IPlatWorkspaceItemText(props) {
    const [isReadOnly, setReadOnly] = useState(false)
    const [text, setText] = useState('')

    const [isClicked, setClicked] = useState(false)

    return(
        <div style={{
            width:'100%',
            height:'100%',
            backgroundColor: 'white',
        }}>
            {
                <textarea style={{
                    outlineStyle:"none",
                    border:"none",
                    fontSize:"24px",
                    fontWeight:"bold",
                    width:'100%',
                    height:'100%',
                    resize:"none",
                }}
                    type="text" placeholder={"Input Text"} onChange={(e) => {setText(e)}}/>
            }
        </div>
    )
}

export default IPlatWorkspaceItemText;
