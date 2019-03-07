import React, {Component} from 'react';
import './MainLayout.css';
import LogoComponent from "../component/LogoComponent";
import RoundedURLInput from "../component/RoundedURLInput";
import ToggleButton from "../component/ToggleButton";
import captureButtonSVG from '../res/capture.svg';

class MainLayout extends Component {
    render() {
        return (
            <div className="MainLayout">
                <LogoComponent/>
                <div className="searchDiv">
                    <RoundedURLInput/>
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
    }
}

export default MainLayout;