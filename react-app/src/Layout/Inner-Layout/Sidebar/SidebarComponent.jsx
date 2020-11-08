import React from 'react'

const SidebarComponent = () => {
    return (
        <>
            <div className="sidebar-header">
                <div className="logo clearfix">
                    <a className="logo-text float-left" href="/ng/dashboard">
                        <div className="logo-img">
                            <img className="ng-tns-c1-0" src="http://localhost:4200/assets/img/logos/al-huda-logo-dashboard.png" />
                        </div>
                    </a>
                </div>
            </div>
            <div className="sidebar-content ps ps--active-y">
                <div className="nav-container">
                    <ul className="navigation">
                        <li>
                            <a href="/ng/dashboard"><i className="ft-home" ></i><span className="menu-title">Dashboard</span></a>
                        </li>
                        <li>
                            <a href="/ng/DonorRecordsGrid"><i className="ft-edit" ></i><span className="menu-title">Donors</span></a>
                        </li>
                        <li className="has-sub">
                            <a href="/ng/AcceptorRecordsGrid">
                                <i className="ft-grid"></i>
                                <span className="menu-title">Donors Contribution</span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <a href="/ng/DonarContributionRecordsGrid"><i className="ng-tns-c1-0"></i><span className="menu-title">General Donors</span></a>
                                </li>
                                <li>
                                    <a href="/ng/MonthlyDonarContributionRecordsGrid"><i className="ng-tns-c1-0"></i><span className="menu-title">Monthly Donors</span></a>
                                </li>
                            </ul>
                        </li>
                        <li >
                            <a href="/ng/AcceptorRecordsGrid"><i className="ft-grid" ></i><span className="menu-title">Acceptors</span></a>
                        </li>
                        <li>
                            <a href="/ng/AcceptorDonationRecordsGrid"><i className="ft-grid"></i><span className="menu-title">Acceptors Donation</span></a>
                        </li>
                        <li>
                            <a href="/ng/StudentRecordsGrid"><i className="ft-grid" ></i><span className="menu-title">Students</span></a>
                        </li>
                        <li className="has-sub">
                            <a href="/ng/AcceptorRecordsGrid"><i className="ft-aperture" ></i><span className="menu-title">Masters</span></a>
                            <ul className="menu-content ng-tns-c1-0 ng-trigger ng-trigger-slideInOut ng-star-inserted">
                                <li>
                                    <a className="ng-tns-c1-0 ng-star-inserted" ng-reflect-router-link="/master/DonationTypeGrid" href="/ng/master/DonationTypeGrid"><i className="ng-tns-c1-0"></i><span className="menu-title">Donation Type</span></a>
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
