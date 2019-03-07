import React, {Component} from 'react';
import './MainLayout.css';
import LogoComponent from "../component/LogoComponent";
import RoundedURLInput from "../component/RoundedURLInput";
import ToggleButton from "../component/ToggleButton";
import captureButtonSVG from '../res/capture.svg';

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
                        <RoundedURLInput buttonAttach={true}/>
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
                </div>
            );
        else
            return (
                <div className="MainLayout">
                </div>
            );

    }
}

export default MainLayout;