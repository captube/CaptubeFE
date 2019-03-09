import React, {Component} from 'react';
import './MainLayout.css';
import LogoComponent from "../component/LogoComponent";
import RoundedURLInput from "../component/RoundedURLInput";
import ToggleButton from "../component/ToggleButton";
import captureButtonSVG from '../res/capture.svg';
import youtubeBG from "../res/bg_youtube.png";

class MainLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "init",
            url: "",
            imgs: []
        }
    }

    render() {
        if (this.state.status == "init") {

            return (
                <div className="MainLayout">
                    <div className="InitLayout">
                        <LogoComponent/>
                        <div className="searchDiv">
                            <RoundedURLInput buttonAttach={true} onButtonClick={(url) => {

                                let subToggleButtonInput = window.document.querySelector(".InitLayout .captureOption .ToggleButton input");

                                let header = new Headers();
                                header.append("Content-Type","application/json");

                                let body = {
                                    url: url,
                                    responseEncodingType : "base64",
                                    language: "en",
                                    noSub: !subToggleButtonInput.checked
                                }

                                let init = {
                                    method: 'POST',
                                    headers: header,
                                    body: JSON.stringify(body)
                                }
                                fetch("/api/v1/capture/getImages",init)
                                    .then(async (response) =>{
                                        let result = await response.json();
                                        this.setState({status:"result", imgs:result})
                                    })
                                    .catch((err)=>{
                                        window.alert("캡쳐에 실패 했습니다");
                                    });
                                let youtubeId = this.getYoutubeIdFromURL(url)
                                this.setState({
                                    status: "loading",
                                    url: "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1"
                                });
                            }}/>
                        </div>
                        <div className="captureOption">
                            <div className="title">Capture option</div>
                            <div className="optionList">
                                <div className="optionItem" id="isSubOption">
                                    <div className="optionName">
                                        유튜브 자막 추가
                                    </div>
                                    <div className="toggleButton">
                                        <ToggleButton/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.status == "loading")

            return (
                <div className="MainLayout">
                    <div className="LoadingLayout">
                        <LogoComponent/>
                        <div className="searchDiv">
                            <RoundedURLInput buttonAttach={false} inputReadOnly={true} url={this.state.uri}/>
                            캡처 중
                        </div>
                        <div className="YoutubePreview">
                            <iframe src={this.state.url} allow="autoplay"/>
                            <img src={youtubeBG}/>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div className="MainLayout">
                    <div className="ResultLayout">
                        <div className="TopLayout">
                            <LogoComponent/>
                            <div className="searchDiv">
                                <RoundedURLInput buttonAttach={true} onButtonClick={(url) => {
                                    let youtubeId = this.getYoutubeIdFromURL(url)
                                    this.setState({
                                        status: "loading",
                                        url: "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1"
                                    });
                                }}/>
                            </div>
                        </div>
                        <div className="RightLayout">
                            <div className="ClipSection">
                                <div className="SectionTitle">CLIP INFORMATION</div>
                                <div className="SectionContents"></div>
                            </div>
                            <div className="OptionSection">
                                <div className="SectionTitle">CAPTION OPTION</div>
                                <div className="SectionContents">
                                    <div className="OptionList">
                                        <div className="Option">
                                            <ToggleButton/>
                                            <div className="OptionName">자막 포함하기</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="NavigationSection">
                                <div className="SectionTitle">CAPTION NAVIGATION</div>
                                <div className="SectionContents"></div>
                            </div>
                            <div className="ButtonSection">
                                <div className="Button">RECAPTURE</div>
                                <div className="Button">DOWNLOAD ALL</div>
                            </div>
                        </div>
                        <div className="TipLayout">
                            <div className="TipTitle">
                                TIP
                            </div>
                            <div className="TipText">
                                이미지를 클릭하면 해당 페이지부터 유튜브 재생이 가능합니다
                            </div>
                        </div>
                        <div className="ImageSection">
                            {
                                this.state.imgs.map((img) => {
                                        return (<img className="CaptureImage" src={"data:image/jpg;base64," + img.data}/>);
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            );
    }

    getYoutubeIdFromURL(url) {
        let id = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            id = url[2].split(/[^0-9a-z_\-]/i);
            id = id[0];
        } else {
            id = url;
        }
        return id;
    }
}

export default MainLayout;