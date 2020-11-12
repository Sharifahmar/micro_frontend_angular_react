import React, { Fragment } from 'react'
import AsideComponent from '../Components/Aside/AsideComponent'
import FooterComponent from '../Components/Footer/FooterComponent'
import NavbarComponent from '../Components/Navbar/NavbarComponent'
import SidebarComponent from '../Components/Sidebar/SidebarComponent'

const InnerLayoutComponent = () => {
    return (
        <>
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
        </>
    )
}
export default InnerLayoutComponent