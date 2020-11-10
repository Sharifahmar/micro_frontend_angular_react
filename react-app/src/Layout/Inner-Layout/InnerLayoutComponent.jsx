import React, { Component, Fragment } from 'react'
import AsideComponent from '../Components/Aside/AsideComponent'
import FooterComponent from '../Components/Footer/FooterComponent'
import NavbarComponent from '../Components/Navbar/NavbarComponent'
import SidebarComponent from '../Components/Sidebar/SidebarComponent'


export class InnerLayoutComponent extends Component {
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <div className="app-sidebar" data-active-color="white" data-background-color="man-of-steel" data-image="assets/img/sidebar-bg/01.jpg">
                        <SidebarComponent />
                        <div className="sidebar-background"></div>
                    </div>
                    <NavbarComponent />
                    <div className="main-panel">
                        <div className="main-content">
                            <div className="content-wrapper">
                                <div className="container-fluid">
                                    <AsideComponent />
                                </div>
                            </div>
                        </div>
                        <FooterComponent />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default InnerLayoutComponent
