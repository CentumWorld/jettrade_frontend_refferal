import React, { useState, useEffect } from "react";
import { Modal, Badge } from "antd";
import axios from "axios";
import "../css/UserSidebar.css";
import { motion } from "framer-motion";
import { MdDashboard, MdSend } from "react-icons/md";
import {
  FaMoneyBillWaveAlt,
  FaBars,
  FaCarrot,
  FaUserPlus,
  FaShare,
} from "react-icons/fa";
import { RxCountdownTimer } from "react-icons/rx";
import { TfiMenuAlt, TfiGift } from "react-icons/tfi";
import { IoTrophy } from "react-icons/io5";
import { FcBarChart } from "react-icons/fc";
import { VscReferences } from "react-icons/vsc";
import {
  AiOutlineSetting,
  AiFillBank,
  AiOutlineAreaChart,
  AiOutlineSwap,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import UserSidebarMenu from "./usersidebar/UserSidebarMenu";
import { UserModal } from "../UserModel/UserModal";
import {
  BsBellFill,
  BsFillChatTextFill,
  BsMinecartLoaded,
} from "react-icons/bs";
import { FcNeutralTrading } from "react-icons/fc";
import { FcUpRight } from "react-icons/fc";
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
  //     path: '/userdashboard/transfer',
  //     name: "Internal transfer",
  //     icon: <MdSend />,
  // },
  // {
  //     path: '/userdashboard/promotion',
  //     name: "Promotions",
  //     icon: <FaCarrot />,
  // },
  // {
  //     path: '/userdashboard',
  //     name: "Operation history",
  //     icon: <RxCountdownTimer />,
  //     subRoutes: [
  //         {
  //             path: "/userdashboard/deposite",
  //             name: 'Deposite history',
  //         },
  //         {
  //             path: "/userdashboard/withdrawlhistory",
  //             name: 'Withdrawal history',
  //         },
  //         {
  //             path: "/userdashboard/transferhistory",
  //             name: 'Transfer history',
  //         },

  //     ],
  // },
  {
    path: "/userdashboard",
    name: "Chart and Data",
    icon: <AiOutlineAreaChart />,
    subRoutes: [
      {
        path: "/userdashboard/cryptocurrency-market",
        name: "Cryptocurrency Market",
      },
      {
        path: "/userdashboard/economic-celender",
        name: "Economic Celender",
      },
      {
        path: "/userdashboard/heat-map",
        name: "Heat Map",
      },
      {
        path: "/userdashboard/cross-rates",
        name: "Cross Rates",
      },
      // {
      //     path: "/userdashboard/helper-charts",
      //     name: 'Helper Charts',
      // },
      {
        path: "/userdashboard/market-data",
        name: "Market Data",
      },
      {
        path: "/userdashboard/screener",
        name: "Screener",
      },
    ],
  },
  // {
  //     path: '/userdashboard/contest',
  //     name: "Contests",
  //     icon: <IoTrophy />,
  //     subRoutes: [
  //         {
  //             path: "/contests/champion-demo",
  //             name: 'Champion Demo Contest',
  //         },
  //         {
  //             path: "/contests/opne-champion-demo/account",
  //             name: ' Opne Champion Demo Contest account',
  //         },
  //     ],
  // },
  // {
  //     path: '/userdashboard/statuses',
  //     name: "User Statuses",
  //     icon: <BiStar />,
  // },
  {
    path: "/userdashboard/invite",
    name: "Invite a friend",
    icon: <FaUserPlus />,
  },
  {
    path: "/userdashboard/refferal-payout",
    name: "Withdrawal",
    icon: <FaShare />,
  },
  // {
  //     path:'/userdashboard/chat',
  //     name:"Chat",
  //     icon:<BsFillChatTextFill />
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
  console.log(showModal);

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
        console.log(result.data.allNotitfication);
        setAllNotification(result.data.allNotitfication);
        setAllRefferalNotification(result.data.allRefferalNotification);
        setParticularRefferalNotification(result.data.particularRefferal);
        // console.log(result.data.allRefferalNotification)
        // console.log(result.data.particularRefferal)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // callApiToNotificationStatus
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
      .catch((err) => {
        console.log(err);
      });
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
      .catch((err) => {
        console.log(err);
      });
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
                {showModal ? <UserModal setShowModal={setShowModal} toggleMenu={toggle} /> : null}
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
          {/* {isOpen ?
                        <div>
                            <NavLink to='/userdashboard/new-deposit' className='deposit_button btn btn-primary'>START WITH A DEPOSIT</NavLink>
                        </div> :
                        <NavLink to='/userdashboard/new-deposit' className='deposit_logo'><AiFillBank /></NavLink>
                    } */}



                    <section className='routes'>
                        {routes.map((route) => {
                            if (route.subRoutes) {
                                return (
                                    <UserSidebarMenu isOpen={isOpen} route={route} />
                                );
                            }
                            if (route.externalLink) {
                                // For the "CENTUMO Swap" link, open in a new tab
                                return (
                                  <a
                                    href={route.path}
                                    key={route.name}
                                    className={
                                      isOpen ? "user_sidebar_link" : "user_sidebar_link_small"
                                    }
                                    target="_blank" // This will open "CENTUMO Swap" in a new tab
                                    rel="noopener noreferrer" // Recommended for security
                                  >
                                    <div className="admin-icon">{route.icon}</div>
                                    <motion.div className="user_link_text">
                                      {route.name}
                                    </motion.div>
                                  </a>
                                );
                              }
                            return (
                                <NavLink to={route.path} key={route.name}
                                 className={isOpen ? 'user_sidebar_link' : 'user_sidebar_link_small'}
                                >
                                    
                                    <div className='icon'>{route.icon}</div>
                                    {isOpen && <motion.div className='link_text'>{route.name}</motion.div>}
                                </NavLink>
                                
                            )
                        })}

                    </section>

                </motion.div>


            </div>
        </>
    )
}

export default UserSidebar;
