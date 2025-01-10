
import React from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegClock
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/userdetails",
            name: "UserDetails",
            icon: <FaUserAlt />
        },
        {
            path: "/checkin",
            name: "CheckIn",
            icon: <FaRegClock />
        },
        {
            path: "/checkout",
            name: "CheckOut",
            icon: <FaRegClock />
        },
    ];

    return (
        <div className="container">
            <div className="sidebar">
                <div className="top_section">
                    <div className="header">
                        <div className="logo-container">
                            <div className="logo-icon">HM</div>
                            <h1 className="logo-text">Hospitality Management</h1>
                        </div>
                        <div className="bars">
                            <FaBars />
                        </div>
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
}

export default Sidebar;
