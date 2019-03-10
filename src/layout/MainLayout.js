import React, {Component} from 'react';
import './MainLayout.css';
import LogoComponent from "../component/LogoComponent";
import RoundedURLInput from "../component/RoundedURLInput";
import ToggleButton from "../component/ToggleButton";
import captureButtonSVG from '../res/capture.svg';
import youtubeBG from "../res/bg_youtube.png";
import JSZip from "../lib/jszip";

class MainLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "init",
            embedUrl: "",
            url: "",
            imgs: []
        }
    }

    componentDidMount() {
        this.setState(this.state);
    }

    render() {
        if (this.state.status == "init") {

            return (
                <div className="MainLayout">
                    <div className="InitLayout">
                        <LogoComponent/>
                        <div className="searchDiv">
                            <RoundedURLInput buttonAttach={true} onButtonClick={(url) => {
                                this.requestImage(url);
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
        } else if (this.state.status == "loading") {
            return (
                <div className="MainLayout">
                    <div className="LoadingLayout">
                        <LogoComponent/>
                        <div className="searchDiv">
                            <RoundedURLInput buttonAttach={false} inputReadOnly={true} url={this.state.url}/>
                            캡처 중
                        </div>
                        <div className="YoutubePreview">
                            <iframe src={this.state.embedUrl} allow="autoplay"/>
                            <img src={youtubeBG}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="MainLayout">
                    <div className="ResultLayout">
                        <div className="TopLayout">
                            <LogoComponent/>
                            <div className="searchDiv">
                                <RoundedURLInput buttonAttach={true} url={this.state.url} onButtonClick={(url) => {
                                    this.requestImage(url);
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
                                <div className="Button" onClick={() => {
                                    this.requestImage(this.state.url);
                                }}>RECAPTURE
                                </div>
                                <a className="Button" onClick={(event) => {
                                    let zip = new JSZip();
                                    this.state.imgs.map((img) => {
                                        zip.add(img.fileName, img.data, {base64: true});
                                    });
                                    let content = zip.generate();
                                    let uri = "data:application/zip;base64," + content;
                                    let blob = window.URL.createObjectURL(this.dataURItoBlob(uri));
                                    event.target.href = blob
                                    event.target.download = "captube.zip";
                                }}>DOWNLOAD ALL</a>
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
    }

    requestImage(url) {
        let subToggleButtonInput = window.document.querySelector(".InitLayout .captureOption .ToggleButton input");
        subToggleButtonInput = subToggleButtonInput ? subToggleButtonInput : window.document.querySelector(".ResultLayout .ToggleButton input");

        let header = new Headers();
        header.append("Content-Type", "application/json");

        let body = {
            url: url,
            responseEncodingType: "base64",
            language: "en",
            noSub: !subToggleButtonInput.checked

        }

        let init = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        }
        fetch("/api/v1/capture/getImages", init)
            .then(async (response) => {
                let result = await response.json();
                this.setState({status: "result", imgs: result})
            })
            .catch((err) => {
                window.alert("캡쳐에 실패 했습니다");
            });
        let youtubeId = this.getYoutubeIdFromURL(url)
        this.setState({
            status: "loading",
            embedUrl: "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1",
            url: url
        });
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

    dataURItoBlob(dataURI, callback) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        let bb = new Blob([ab]);
        return bb;
    }
}

export default MainLayout;