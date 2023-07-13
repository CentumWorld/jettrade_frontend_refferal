import React, { useRef } from "react";
import ReactDom from "react-dom";
import '../UserModel/UserModel.css';
import { NavLink } from "react-router-dom";
import { RiErrorWarningFill } from 'react-icons/ri';
import {MdOutlineVerifiedUser} from 'react-icons/md';
import {IoMdLock} from 'react-icons/io'
import {GiAnticlockwiseRotation} from 'react-icons/gi'
import {BiNews} from 'react-icons/bi'
import {BsStars} from 'react-icons/bs'
import {FaUserCircle,FaRegFlag} from 'react-icons/fa'


export const UserModal = ({ setShowModal }) => {
    // close the modal when clicking outside the modal.
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };

    // render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
            <div className="user_modal">
                {/* <h2>This is a Modal</h2>
        <button onClick={() => setShowModal(false)}>X</button> */}
                <ul>
                    <li style={{'padding-bottom':'30px'}}><NavLink to="/userdashboard/setting/userdetails"><RiErrorWarningFill/>&nbsp;&nbsp; Your Details</NavLink></li>
                    <li style={{'padding-bottom':'30px'}}><NavLink to="/userdashboard/setting/verify"><MdOutlineVerifiedUser/>&nbsp;&nbsp;Profile verification</NavLink></li>
                    <li style={{'padding-bottom':'30px'}}><NavLink to="/userdashboard/setting/changepassword"><IoMdLock/>&nbsp;&nbsp;Change password</NavLink></li>
                    {/* <li style={{'padding-bottom':'30px'}}><NavLink to="/userdashboard/setting/resetpassword"><GiAnticlockwiseRotation/>&nbsp;&nbsp;Reset password</NavLink></li>
                    <li style={{'padding-bottom':'30px'}}><NavLink to="/userdashboard/setting/newsletter"><BiNews/>&nbsp;&nbsp;Newsletters</NavLink></li>
                    <li style={{'padding-bottom':'30px'}}><NavLink to="/userdashboard/setting/bonus"><BsStars/>&nbsp;&nbsp;Bonus setting</NavLink></li>
                    <li style={{'padding-bottom':'30px'}}><NavLink to=""><FaUserCircle/>&nbsp;&nbsp;Account log</NavLink></li> */}
                    <li><NavLink to=""><FaRegFlag/>&nbsp;&nbsp;Language</NavLink></li>
                </ul>
                
            </div>
        </div>,
        document.getElementById("portal")
    );
};


