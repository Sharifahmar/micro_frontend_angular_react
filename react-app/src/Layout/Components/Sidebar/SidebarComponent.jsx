import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const SidebarComponent = () => {
    const [ openCss, setopenCss ] = useState('');
    const liElement = useRef(null);
    const addOpenCss = () => {
        liElement.current.className.includes('open') ? setopenCss('') : setopenCss('open');
    }
    return (
        <>
            <div className="sidebar-header">
                <div className="logo clearfix">
                    <a className="logo-text float-left" href="/ng/dashboard">
                        <div className="logo-img">
                            <img src="http://localhost:4200/assets/img/logos/al-huda-logo-dashboard.png" />
                        </div>
                    </a>
                </div>
            </div>
            <div className="sidebar-content ps ps--active-y">
                <div className="nav-container">
                    <ul className="navigation">
                        <li>
                            <Link to="/ng/dashboard"><i className="ft-home" ></i><span className="menu-title">Dashboard</span></Link>
                        </li>
                        <li>
                            <Link to="/ng/DonorRecordsGrid"><i className="ft-edit" ></i><span className="menu-title">Donors</span></Link>
                        </li>
                        <li className={`has-sub ${openCss}`} onClick={addOpenCss} ref={liElement}>
                            <a>
                                <i className="ft-grid"></i>
                                <span className="menu-title">Donors Contribution</span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <Link to="/ng/GeneralDonorContributionRecordsGrid"><span className="menu-title">General Donors</span></Link>
                                </li>
                                <li>
                                    <Link to="/ng/MonthlyDonorContributionRecordsGrid"><span className="menu-title">Monthly Donors</span></Link>
                                </li>
                            </ul>
                        </li>
                        <li >
                            <Link to="/ng/AcceptorRecordsGrid"><i className="ft-grid" ></i><span className="menu-title">Acceptors</span></Link>
                        </li>
                        <li>
                            <Link to="/ng/AcceptorDonationRecordsGrid"><i className="ft-grid"></i><span className="menu-title">Acceptors Donation</span></Link>
                        </li>
                        <li>
                            <Link to="/ng/StudentRecordsGrid"><i className="ft-grid" ></i><span className="menu-title">Students</span></Link>
                        </li>
                        <li className="has-sub">
                            <a ><i className="ft-aperture" ></i><span className="menu-title">Masters</span></a>
                            <ul className="menu-content">
                                <li>
                                    <Link to="/ng/master/DonationTypeGrid"><span className="menu-title">Donation Type</span></Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SidebarComponent
