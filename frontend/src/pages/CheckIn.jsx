import React from "react";
import "./Checkin.css";

const Checkin = () => {
    return (
        <div className="checkin-page">
            <div className="checkin-form-container">
                <form className="checkin-form">
                    <h2>Login</h2>
                    <input type="text" placeholder="Teczite Id "/>
                
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default Checkin;
