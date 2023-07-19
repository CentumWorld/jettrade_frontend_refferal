import React, { useEffect, useState } from 'react'
import '../css/RefferalPayout.css'
import axios from 'axios';
import { Button, Input, message, Tabs, Table } from 'antd'
import { FaRupeeSign } from 'react-icons/fa';
import moment from 'moment';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl

const { TabPane } = Tabs;


const RefferalPayout = () => {

    const [payoutAmout, setPayOutAmount] = useState(0);
    const [amount, setAmount] = useState('');
    const [requestDetails, setRequestDetails] = useState([])
    const [lastAmount, setLastAmount] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [approvedDetails, setApprovedDetails] = useState([]);


    const handleAmountChange = (e) => {
        const value = e.target.value;
        const formattedAmount = value.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
        setAmount(formattedAmount);
    };

    const requestRefferalPayout = (e) => {
        e.preventDefault();
        console.log(amount)
        const token = localStorage.getItem('token')
        const data = {
            memberid: localStorage.getItem('memberid'),
            requestAmount: amount
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post(`${apiurl}`+'/member/refferal/refferal-payout-request-member', data, config)
            .then((res) => {
                message.success('Requested sent');
                fetchRefferalPayout();
                setAmount('');
            })
            .catch(err => {
                message.warning(err.response.data.message)
            })
    };
    useEffect(() => {
        fetchRefferalPayout();
        fetchRefferalRequest();
        fetchApprovedRequest();
    }, [requestDetails]);

    const fetchRefferalPayout = () => {
        let token = localStorage.getItem('token');
        let memberid = localStorage.getItem('memberid');
        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        const data = {
            memberid: memberid
        }
        axios.post(`${apiurl}`+'/member/refferal/member-fetch-refferal-payout', data, config)
            .then((res) => {
                const formattedAmount = res.data.wallet.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                });
                setPayOutAmount(formattedAmount)
            })
            .catch(err => {
                console.log(err);
            })
    }
    // fetch refferal request data
    const fetchRefferalRequest = () => {
        let token = localStorage.getItem("token");
        let data = {
            memberid: localStorage.getItem('memberid')
        }
        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        axios.post(`${apiurl}`+'/member/refferal/fetch-member-refferal-payout-request-withdrawal', data, config)
            .then((res) => {
                const length = res.data.memberWithdrawalRequest.length;
                const lastData = res.data.memberWithdrawalRequest[length - 1];
                const lastDate = res.data.memberWithdrawalRequest[length - 1].requestDate;
                console.log(res);
                const formattedDate = new Date(lastDate).toLocaleDateString();
                const parts = formattedDate.split('/');
                const month = parts[0];
                const day = parts[1];
                const year = parts[2];
                const finalDate = `${day}/${month}/${year}`;
                console.log(finalDate,lastData.walletAmount,'180');
                 setLastDate(finalDate);
                setLastAmount(lastData.walletAmount);
                setRequestDetails(res.data.memberWithdrawalRequest);
                fetchRefferalPayout();

            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    // fetch approved request--
    const fetchApprovedRequest = () => {
        let token = localStorage.getItem('token');
        let data = {
            memberid: localStorage.getItem('memberid'),
        }
        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post(`${apiurl}`+'/member/refferal/member-fetch-refferal-payout-approve-withdrawal', data, config)
            .then((res) => {
                console.log(res.data);
                setApprovedDetails(res.data.memberApproveWithdrawal)
            })
            .catch(err => {
                console.log(err)
            })
    }
    //data ---------
    const requestColumns = [
        {
            title: 'Member ID',
            dataIndex: 'memberid',
            key: 'memberid',
        },
        {
            title: 'Amount',
            dataIndex: 'walletAmount',
            key: 'walletAmount',
            render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
        },
        {
            title: 'Withdraw Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
            render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
        },
    ];

    // const approvedColumns = [
    //     {
    //         title: 'Member ID',
    //         dataIndex: 'memberid',
    //         key: 'memberid',
    //     },
    //     {
    //         title: 'Wallet Amount',
    //         dataIndex: 'walletAmount',
    //         key: 'walletAmount',
    //         render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
    //     },
    //     {
    //         title: 'Requested Date',
    //         dataIndex: 'requestDate',
    //         key: 'requestDate',
    //         render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
    //     },
    //     {
    //         title: 'Approved Date',
    //         dataIndex: 'approveDate',
    //         key: 'approveDate',
    //         render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
    //     },
    // ];


    console.log(lastDate);

    return (
        <div className="reffer-container">
            <p>Reffer Payout History</p>

            <div class="card-container">
                <div class="card">
                    <p>Total Amount</p>
                    <h6>Total Amount: {payoutAmout}</h6>
                    <p>Refferal Payout Amount</p>
                </div>
                <div class="card">
                    <p>Refferal Payout Request</p>
                    <label htmlFor="">Enter Amount</label>
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                        prefix={<FaRupeeSign />}
                    />
                    <Button onClick={requestRefferalPayout}>Withdraw</Button>
                </div>
                <div class="card">
                    <p>Last Payout Request</p>
                    <h6>Amount:<FaRupeeSign /> {lastAmount}</h6>
                    <strong> Last Date: {lastDate}</strong>
                </div>

                <br />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Withdrawal" key="1">
                        <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                            <Table columns={requestColumns} dataSource={requestDetails} />
                        </div>

                    </TabPane>
                    {/* <TabPane tab="Approved" key="2">
                        <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                            <Table columns={approvedColumns} dataSource={approvedDetails} />
                        </div>
                    </TabPane> */}
                </Tabs>
            </div >
        </div >
    )
}

export default RefferalPayout