import React, { Component, Fragment } from 'react'
import AsideComponent from './Aside/AsideComponent'
import FooterComponent from './Footer/FooterComponent'
import NavbarComponent from './Navbar/NavbarComponent'
import SidebarComponent from './Sidebar/SidebarComponent'


export class InnerLayoutComponent extends Component {
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <div className="app-sidebar" data-active-color="white" data-background-color="man-of-steel" data-image="assets/img/sidebar-bg/01.jpg">
                        <div className="sidebar-background">
                            <SidebarComponent />
                        </div>
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
