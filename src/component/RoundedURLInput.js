import React, {Component} from 'react';
import './RoundedURLInput.css';
import captureButtonSVG from "../res/capture.svg";

class RoundedURLInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonAttach: props.buttonAttach
        }
    }

    render() {
        if (this.state.buttonAttach)
            return (
                <div className="RoundedURLInput">
                    <div className="searchBarWrapper">
                        <input onKeyDown={async (event) => {
                            if (event.keyCode == 13) {
                                window.location.href = '/search/' + event.target.value;
                            }
                        }} type="url" placeholder="CTRL+V URL"></input>
                        <div className="captureBtnDiv">
                            <img src={captureButtonSVG} className="captureImageButton"/>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div className="RoundedURLInput">
                    <div className="searchBarWrapper">
                        <input onKeyDown={async (event) => {
                            if (event.keyCode == 13) {
                                window.location.href = '/search/' + event.target.value;
                            }
                        }} type="url" placeholder="CTRL+V URL"></input>
                    </div>
                </div>
            );
    }
}

export default RoundedURLInput;