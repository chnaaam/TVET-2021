import React from 'react';
import './iplat_check_box.css';

function IPlatCheckBox(props) {

    return(
        <div>
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" style={{
                color:props.Color,
            }}>{props.Title}</label>
        </div>
    )
}

export default IPlatCheckBox;
