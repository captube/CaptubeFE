import React, {Component} from 'react';
import './RoundedURLInput.css';
import captureButtonSVG from "../res/capture.svg";

class RoundedURLInput extends Component {

    constructor(props) {
        super(props);

        let inputURL = props.url ? props.url : "";
        let inputReadOnly = props.inputReadOnly ? props.inputReadOnly : false;

        this.state = {
            buttonAttach: props.buttonAttach,
            onButtonClick: props.onButtonClick,
            url: inputURL,
            inputReadOnly: inputReadOnly
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let inputURL = nextProps.url ? nextProps.url : "";
        let inputReadOnly = nextProps.inputReadOnly ? nextProps.inputReadOnly : false;

        this.state = {
            buttonAttach: nextProps.buttonAttach,
            onButtonClick: nextProps.onButtonClick,
            url: inputURL,
            inputReadOnly: inputReadOnly
        }
    }

    render() {
        let input = null;

        if (this.state.buttonAttach)
            return (
                <div className="RoundedURLInput">
                    <div className="searchBarWrapper">
                        <input onKeyDown={async (event) => {
                            if (event.keyCode == 13) {
                                ;
                            }
                        }} type="url" placeholder="CTRL+V URL" value={this.state.inputURL} readOnly={this.state.inputReadOnly}></input>
                        <div className="captureBtnDiv" onClick={() => {
                            let inputElem = document.querySelector(".RoundedURLInput .searchBarWrapper input");
                            this.state.url = inputElem.value;
                            this.state.onButtonClick(this.state.url);
                        }}>
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
                        }} type="url" placeholder="CTRL+V URL" value={this.state.inputURL} readOnly={this.state.inputReadOnly}></input>
                    </div>
                </div>
            );
    }
}

export default RoundedURLInput;