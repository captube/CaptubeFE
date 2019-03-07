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
            url: ""
        }
    }

    render() {
        if (this.state.status == "init")
            return (
                <div className="MainLayout">
                    <LogoComponent/>
                    <div className="searchDiv">
                        <RoundedURLInput buttonAttach={true} onButtonClick={(url) => {
                            let youtubeId = this.getYoutubeIdFromURL(url)
                            this.setState({status: "loading", url: "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1"});
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
            );
        else if (this.state.status == "loading")
            return (
                <div className="MainLayout">
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
            );
        else
            return (
                <div className="MainLayout">
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