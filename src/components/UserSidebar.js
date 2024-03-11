import React, { useState, useEffect } from "react";
import { Modal, Badge } from "antd";
import axios from "axios";
import "../css/UserSidebar.css";
import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FaBars, FaShare } from "react-icons/fa";

import { FcBarChart } from "react-icons/fc";
import { VscReferences } from "react-icons/vsc";
import { AiOutlineSetting, AiFillBank, AiOutlineSwap } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import UserSidebarMenu from "./usersidebar/UserSidebarMenu";
import { UserModal } from "../UserModel/UserModal";
import { BsBellFill, BsMinecartLoaded } from "react-icons/bs";
import baseUrl from "../baseUrl";
import { BiLogOutCircle } from "react-icons/bi";
const apiurl = baseUrl.apiUrl;

const routes = [
  {
    path: "/userdashboard/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    path: "https://centumo.centumworld.com/#/exchange/quick",
    name: "CENTUMO Swap",
    icon: <AiOutlineSwap />,
    externalLink: true,
    target: "_blank",
  },
  {
    path: "https://centumworldrig.com/",
    name: "CENTUMO RIG",
    icon: <BsMinecartLoaded />,
    externalLink: true,
    target: "_blank",
  },
  {
    path: "/userdashboard/trading-chart",
    name: "Trading Chart",
    icon: <FcBarChart />,
  },

  // {
  //   path: "/userdashboard/refferal-payout",
  //   name: "Withdrawal",
  //   icon: <FaShare />,
  // },

  {
    path: "/userdashboard/referral-payout",
    name: "Referral Payout",
    icon: <VscReferences />,
  },
  {
    path: "/userdashboard/add-bank-details",
    name: "Add Bank",
    icon: <AiFillBank />,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: <BiLogOutCircle />,
  },
];

function UserSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [allNotification, setAllNotification] = useState([]);
  const [allRefferalNotification, setAllRefferalNotification] = useState([]);
  const [particularRefferalNotification, setParticularRefferalNotification] =
    useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notificatonStatus, setNotificationStatus] = useState(0);
  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    callApiToNotificationStatus();
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const name = localStorage.getItem("fname");
  const clickOnBell = () => {
    setOpenNotificationModal(true);
    callApiToFetchAllNotification();
    notificationStatusRemove();
  };

  //handle all notification
  const handleOk = () => {
    setOpenNotificationModal(false);
  };

  // callApiToFetchAllNotification
  const callApiToFetchAllNotification = () => {
    const token = localStorage.getItem("token");
    const memberid = localStorage.getItem("memberid");
    const data = { memberid };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${apiurl}` + "/member/refferal/fetch-refferal-notification",
        data,
        config
      )
      .then((result) => {
        setAllNotification(result.data.allNotitfication);
        setAllRefferalNotification(result.data.allRefferalNotification);
        setParticularRefferalNotification(result.data.particularRefferal);
      })
      .catch((err) => {});
  };

  //callApiToNotificationStatus
  const callApiToNotificationStatus = () => {
    const token = localStorage.getItem("token");
    const memberid = localStorage.getItem("memberid");
    const data = { memberid };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${apiurl}` + "/member/refferal/fetch-member-notification-status",
        data,
        config
      )
      .then((res) => {
        setNotificationStatus(res.data.isNotification);
      })
      .catch((err) => {});
  };

  // notificationStatusRemove
  const notificationStatusRemove = () => {
    const token = localStorage.getItem("token");
    const memberid = localStorage.getItem("memberid");
    const data = { memberid };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${apiurl}` + "/member/refferal/set-notification-to-false-member",
        data,
        config
      )
      .then((res) => {
        callApiToNotificationStatus();
      })
      .catch((err) => {});
  };

  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let width;

  if (isOpen && windowWidth < 768) {
    width = "100vw";
  } else if ((!isOpen && windowWidth > 768) || (!isOpen && windowWidth < 768)) {
    width = "50px";
  } else {
    width = "350px";
  }

  return (
    <>
      <div className="refferal-notification">
        <Modal
          title="Notification"
          className="refferal-notification-title"
          open={openNotificationModal}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
        >
          <p className="refferal-general-notification">General Notification</p>
          <div className="refferal-general-notification-section">
            {allNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
          <br />
          <p className="for-refferal-notification">For Refferals</p>
          <div className="for-refferal-notification-section">
            {allRefferalNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
          <br />
          <p className="for-refferal-only-notification">For You Only</p>
          <div className="for-refferal-only-notification-section">
            {particularRefferalNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
        </Modal>
      </div>

      <div className="main-container" style={{ width: width }}>
        <motion.div animate={{ width: width }} className="userSidebar">
          <div className="top_section">
            {isOpen && <h1 className="logo">{name}</h1>}

            {isOpen && (
              <div className="setting">
                <AiOutlineSetting onClick={openModal} />
                {showModal ? (
                  <UserModal setShowModal={setShowModal} toggleMenu={toggle} />
                ) : null}
              </div>
            )}
            <div className="notification">
              <Badge count={notificatonStatus}>
                {isOpen && (
                  <BsBellFill
                    onClick={clickOnBell}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Badge>
            </div>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route) => {
              if (route.subRoutes) {
                return <UserSidebarMenu isOpen={isOpen} route={route} />;
              }
              if (route.externalLink) {
                return (
                  <a
                    href={route.path}
                    key={route.name}
                    className={
                      isOpen ? "user_sidebar_link" : "user_sidebar_link_small"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="user_link_text">
                      {route.name}
                    </motion.div>
                  </a>
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={route.name}
                  className={
                    isOpen ? "user_sidebar_link" : "user_sidebar_link_small"
                  }
                >
                  <div className="icon">{route.icon}</div>
                  {isOpen && (
                    <motion.div
                      className="link_text"
                      style={{ marginTop: "6px" }}
                    >
                      {route.name}
                    </motion.div>
                  )}
                </NavLink>
              );
            })}
          </section>
        </motion.div>
      </div>
    </>
  );
}

export default UserSidebar;
