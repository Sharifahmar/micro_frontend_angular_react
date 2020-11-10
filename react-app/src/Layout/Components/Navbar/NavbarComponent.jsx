import React, { useState } from 'react';
import {
    Link, useHistory
} from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import './NavbarComponent.scss';


const NavbarComponent = () => {

    const [ fullscreenClass, setfullscreenClass ] = useState('ft-maximize');

    // let history = useHistory();
    //history.push('/ng/dashboard');
    const handlefullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setfullscreenClass('ft-minimize');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setfullscreenClass('ft-maximize');
            }
        }
    }
    return (
        <>
            <nav className="header-navbar navbar navbar-expand-lg navbar-light bg-faded">
                <div className="container-fluid">
                    <div className="navbar-header">
                    </div>
                    <div className="navbar-container">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item mr-2  d-none d-lg-block">
                                    <a className="nav-link" id="navbar-fullscreen" onClick={handlefullScreen}>
                                        <i className={`${fullscreenClass} font-medium-3 blue-grey darken-4`}></i>
                                        <p className="d-none">fullscreen</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <UncontrolledDropdown >
                                        <DropdownToggle tag="a" className="nav-link" caret>
                                            <i className="ft-user font-medium-3 blue-grey darken-4"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <i className="ft-user mr-2"></i>
                                                <span className="text-capitalize">Welcome</span>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <i className="ft-edit mr-2"></i>
                                                <Link to="/ng/UserProfile"><span>My Profile</span></Link></DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                <i className="ft-power mr-2"></i>
                                                <Link to="/ng/pages/login"><span>Logout</span></Link></DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarComponent
