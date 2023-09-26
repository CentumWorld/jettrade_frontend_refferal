import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/DisplayCard.css';
import { FaRupeeSign, FaHandHoldingUsd } from 'react-icons/fa';
import axios from 'axios';
import { Modal, Menu, Dropdown, Table, message } from 'antd';
import {FaCopy} from "react-icons/fa"
import baseUrl from '../baseUrl';
import moment from 'moment';

const apiurl = baseUrl.apiUrl

const DisplayCard = () => {

    const handleMenuClick = (e) => {
        console.log(e.key);
        if (e.key === 'cryptocurrency-market') {
            //openUserLoginFuction();
            navigate('/userdashboard/cryptocurrency-market');
        }
        if (e.key === 'economic-celender') {
            //console.log("hii");
            // <NavLink to="/user-registration">Sign Up</NavLink>
            navigate('/userdashboard/economic-celender');
        }
        if (e.key === 'heat-map') {
            navigate('/userdashboard/heat-map')
        }
        if (e.key === 'cross-rates') {
            navigate('/userdashboard/cross-rates');
        }
        if (e.key === 'screener') {
            navigate('/userdashboard/screener');
        }
        if (e.key === 'market-data') {
            navigate('/userdashboard/market-data');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="cryptocurrency-market">Cryptocurrency Market</Menu.Item>
            <Menu.Item key="economic-celender">Economic Celender</Menu.Item>
            <Menu.Item key="heat-map">Heat Map</Menu.Item>
            <Menu.Item key='cross-rates'>Cross rates</Menu.Item>
            <Menu.Item key='market-data'>Market data</Menu.Item>
            <Menu.Item key='screener'>Screener</Menu.Item>
        </Menu>
    );

    const navigate = useNavigate();
    const [memberDetails, setMemberDetails] = useState({
        memberid: '',
        refferal: '',
    });
    const [subscriptionStatus, setSubscriptionStatus] = useState({
        memberid: '',
        formattedAmount: ''
    })
    const [totalWithdrawal, setTotalWithdrawal] = useState(0);
    const [refferalTeam, setRefferalTeam] = useState([]);
    const [noRefferalTeam, setNoRefferalTeam] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        setMemberDetails({ memberid: localStorage.getItem('memberid'), refferal: localStorage.getItem('refferal') })
        fetchTotalWithdrawal();
        fetchMemberDataForSubscription();
        callApiToMyTeam();
    }, [])


    // joinChat

    const joinChat = () => {
        navigate('/userdashboard/chat');
    }

    // fetchMemberDataForSubscription
    const fetchMemberDataForSubscription = () => {
        const memberid = localStorage.getItem("memberid");
        const token = localStorage.getItem("token");
        const data = {
            memberid: memberid
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` + '/member/fetch-member-details-member-side', data, config)
            .then((res) => {

                const walletAmount = res.data.result.wallet
                const formattedAmount1 = walletAmount.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                });

                setSubscriptionStatus({
                    userid: res.data.result.userid,
                    formattedAmount: formattedAmount1

                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // total withdrawal
    const fetchTotalWithdrawal = () => {
        const memberid = localStorage.getItem("memberid");
        const token = localStorage.getItem("token");
        const data = {
            memberid: memberid
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` + '/member/refferal/refferal-total-withdrawal', data, config)
            .then((res) => {
                //console.log(res.data.walletAmount)
                if (res.data.data === 0) {
                    setTotalWithdrawal(0)


                } else {
                    const totalWithdrawal = res.data.walletAmount;
                    const formattedwithdrawal = totalWithdrawal.toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                    });
                    setTotalWithdrawal(formattedwithdrawal)
                }


            })
            .catch((error) => {
                console.log(error);
            })
    }

    // call api to my team 
    const callApiToMyTeam = () => {
        const token = localStorage.getItem('token');
        const data = {
            refferal_id: localStorage.getItem("refferal")
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` + '/member/refferal/refferal-my-team', data, config)
            .then((res) => {
                // console.log(res.data.teamMembers.length)
                if (res.data.teamMembers) {
                    setRefferalTeam(res.data.teamMembers);
                    // console.log(res.data.teamMembers);

                    setNoRefferalTeam(false)
                } else {
                    setNoRefferalTeam(true)

                }

            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    // modal for my team
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    // refferalPayout
    const refferalPayout = () => {
        navigate('/userdashboard/refferal-payout');
    }

    // viewTradingChart
    const viewTradingChart = () => {
        navigate('/userdashboard/trading-chart');
    }

    // viewPersonalDetails
    const viewPersonalDetails = () => {
        navigate('/userdashboard/setting/userdetails')
    }
    const gotoWithdrawalPage = () => {
        navigate('/userdashboard/refferal-payout');
    }

    const columns = [
        {
            title: 'Trader ID',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: 'Amount',
            dataIndex: 'referralAmount',
            key: 'referralAmount',
            render: (referralAmount) => new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            }).format(referralAmount),
        },
        {
            title: 'Type',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'DOJ',
            dataIndex: 'joininigDate',
            key: 'joininigDate',
            render: (joininigDate) => moment(joininigDate).format('YYYY-MM-DD HH:mm'),
        },

    ];

    const copyToClipBoard = ()=>{
        navigator.clipboard.writeText(memberDetails.refferal)
        message.success("Text copied to clipboard" + memberDetails.refferal)
    }


    return (
        <>
            <div className='card1-container'>
                <div className='card1'>
                    <div className='d-flex'>
                        <h6>Member ID </h6>&nbsp; : &nbsp;<span style={{ color: 'yellow' }}>{memberDetails.memberid}</span>
                    </div>
                    <div className='d-flex'>
                        <h6>Referral ID</h6> &nbsp; : &nbsp; <span style={{ cursor: 'pointer', color: 'yellow' }} onClick={copyToClipBoard}>{memberDetails.refferal} <FaCopy style={{color:"white"}}/></span>
                    </div>
                </div>
                <div className="card1">
                    <div className="live-chat">
                        <h6>CENTUMO Swap</h6>
                    </div>
                    <div className="live-chat-join">
                        <a
                            href="https://centumo.centumworld.com/#/exchange/quick"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "yellow", cursor: "pointer" }}
                        >
                            Click me
                        </a>
                    </div>
                </div>

                <div className='card1'>
                    <div className='live-chat'>
                        <h6>Personal Details</h6>
                    </div>
                    <div className='live-chat-join'>
                        <span style={{ color: 'yellow', cursor: 'pointer' }} onClick={viewPersonalDetails} >View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='live-chat'>
                        <h6>Live Chat</h6>
                    </div>
                    <div className='live-chat-join' onClick={joinChat} >
                        <span style={{ color: 'yellow', cursor: 'pointer' }}>Join</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='wallet'>
                        <h6>Wallet</h6>
                    </div>
                    <div className='d-flex'>
                        <h6>Balance :</h6>&nbsp;&nbsp; <span style={{ color: 'yellow' }}>{subscriptionStatus.formattedAmount}</span>
                    </div>
                    {/* <div className='d-flex'>
                        <h6>Withdrawal :</h6>&nbsp;&nbsp; <span style={{ color: 'yellow' }}><FaRupeeSign />{totalWithdrawal}</span>
                    </div> */}
                </div>

                <div className='card1'>
                    <div className='wallet'>
                        <h6>Withdrawal</h6>
                    </div>
                    <div className='d-flex'>
                        <h6>Total withdrawal:</h6>&nbsp;&nbsp; <span style={{ color: 'yellow' }}>{totalWithdrawal}</span>
                    </div>
                    <div className='d-flex' style={{ cursor: 'pointer' }} onClick={gotoWithdrawalPage}>
                        <h6>Withdraw :</h6>&nbsp;&nbsp; <span style={{ color: 'yellow' }}><FaHandHoldingUsd /></span>
                    </div>
                </div>

                <div className='card1'>
                    <div className='inviteFriend'>
                        <h6>Invite Friend</h6>
                    </div>
                    <div className='share'>
                        <span style={{ color: 'yellow', cursor: 'pointer' }}>share</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='my-team'>
                        <h6>My Team</h6>
                    </div>
                    <div className='my-team-view' onClick={showModal} >
                        <span style={{ color: 'yellow', cursor: 'pointer' }}>View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='refferal-payout'>
                        <h6>Referral Payout</h6>
                    </div>
                    <div className='refferal-payout-view'>
                        <span style={{ color: 'yellow', cursor: 'pointer' }} onClick={refferalPayout} >View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='trading-chart'>
                        <h6>Trading Chart</h6>
                    </div>
                    <div className='trading-chart'>
                        <span style={{ color: 'yellow', cursor: 'pointer' }} onClick={viewTradingChart} >View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='trading-chart'>
                        <h6>Chart and Data</h6>
                    </div>
                    <div className='trading-chart'>
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                            <span style={{ color: 'yellow', cursor: 'pointer' }}>View</span>
                        </Dropdown>
                    </div>
                </div>
            </div>


            {/* ----------------My team modal */}
            <Modal
                title={<span style={{ color: "purple" }}>My Team</span>}
                open  ={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {!noRefferalTeam ?
                    <div>
                        <Table dataSource={refferalTeam} columns={columns} />
                    </div>

                    : 'No Refferal Found'}
            </Modal>

        </>
    )
}

export default DisplayCard