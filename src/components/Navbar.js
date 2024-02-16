import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import UserLogin from "./UserLogin";
import Button from "react-bootstrap/Button";
import { Dropdown, Menu } from "antd";
import MemberForgetPassword from "./MemberForgetPassword";
import logo from "./../img/logo1.png";
import { RiLogoutBoxLine } from "react-icons/ri";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const login = localStorage.getItem("login");

  const [userShow, setUserShow] = useState(false);
  const [passwordModal, setPasswordModel] = useState(false);

  const openUserLoginFuction = () => setUserShow(true);
  const pull_data = (data) => setUserShow(data);

  const openForgetPasswordFunction = () => setPasswordModel(true);
  const forgetdata = (data) => setPasswordModel(data);

  //react metarial drop down
  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    if (e.key === "login") {
      navigate("/member-login");
    }
    if (e.key === "signup") {
      navigate("/member-registration");
    }
    if (e.key === "forget") {
      openForgetPasswordFunction();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="login">Login</Menu.Item>
      <Menu.Item key="signup">Sign Up</Menu.Item>
      <Menu.Item key="forget">Forget Password</Menu.Item>
    </Menu>
  );

  const RenderMenu = () => {
    if (login) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="btn rounded btn-outline-primary rounded-pill"
              to="/logout"
              aria-current="page"
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                width: "max-content",
                color: "0D6EFD",
              }}
            >
              Logout
              <RiLogoutBoxLine style={{ height: "1rem", width: "1rem" }} />
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button variant=" btn rounded btn-outline-primary rounded-pill">
                Member
              </Button>
            </Dropdown>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-box navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">
            <div>
              <h3>JETTRADE FX </h3>
            </div>
            <div>
              <img
                src={logo}
                alt=""
                style={{ width: "100px", height: "35px" }}
              />
            </div>
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
        {userShow ? <UserLogin func={pull_data} /> : ""}

        {passwordModal ? <MemberForgetPassword forgfunc={forgetdata} /> : ""}
      </nav>
    </>
  );
}

export default Navbar;
