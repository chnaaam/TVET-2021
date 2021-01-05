import React from 'react';
import IPlatBoldCorpus from "../../component/text/iplat_bold_corpus";
import IPlatImage from "../../component/image/iplat_image";
import IPlatNomalCorpus from "../../component/text/iplat_normal_corpus";

function IPlatIntroductionCorpus(props){
    return(
        <div style={{
            width:props.W,
            height:props.H,

            display:"flex",
            flexDirection:"col",
            flexWrap:"wrap",
            justifyContent:"space-around",
            alignContent:"space-around",

            // backgroundColor:"blue",
        }}>
            <h1>
                <IPlatBoldCorpus
                    Title={props.BoldTitle}
                    FontColor={props.BoldFontColor}
                    FontSize={props.BoldFontSize}/>
            </h1>
            <IPlatImage
                W={props.ImgW}
                H={props.ImgH}
                Img={props.Img}/>
            <span>
                <IPlatNomalCorpus
                    Title={props.NomalTitle}
                    FontColor={props.NomalFontColor}
                    FontSize={props.NomalFontSize}
                />
                <IPlatNomalCorpus
                    Title={props.Nomalp}
                    FontColor={props.NomalFontColor}
                    FontSize={props.NomalpFontSize}
                />
            </span>

        </div>
    );
}

export default IPlatIntroductionCorpus;
