import React,{Component} from 'react';
import './MainLayout.css';
import LogoComponent from "../component/LogoComponent";
import RoundedURLInput from "../component/RoundedURLInput";

class MainLayout extends Component {
    render() {
        return (
            <div className="MainLayout">
                <LogoComponent/>
                <RoundedURLInput/>
            </div>
        );
    }
}

export default MainLayout;