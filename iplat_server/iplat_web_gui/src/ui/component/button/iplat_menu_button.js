import React, {useState} from "react";

function IPlatIconButton(props) {
    const [Img, setImg] = useState(props.Img);

    return(
        <img
            style={{
                width:props.W,
                height:props.H,

                display: props.Display,

                cursor: "pointer",
            }}
            onMouseOver={(event => setImg(props.HoverImg))}
            onMouseLeave={(event => setImg(props.Img))}
            onClick={props.OnClick}
            src={Img}
        />
    )
}

export default IPlatIconButton;
