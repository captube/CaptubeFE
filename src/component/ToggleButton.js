import React, {Component} from 'react';
import './ToggleButton.css';

class ToggleButton extends Component {
    render() {
        return (
            <div className="ToggleButton">
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}

export default ToggleButton;