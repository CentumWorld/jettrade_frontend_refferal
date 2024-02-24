import React, { useEffect, useState } from "react";
import "../css/RefferalPayout.css";
import axios from "axios";
import { Button, Input, message, Tabs, Table, Modal, Radio } from "antd";
import { FaRupeeSign } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs"
import moment from "moment";
import baseUrl from "../baseUrl";
import { endDate } from "./common/EndDate";
import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";

const apiurl = baseUrl.apiUrl;

const { TabPane } = Tabs;

const RefferalPayout = () => {
  const navigate = useNavigate();

  const [payoutAmout, setPayOutAmount] = useState(0);
  const [amount, setAmount] = useState("");
  const [requestDetails, setRequestDetails] = useState([]);
  const [lastAmount, setLastAmount] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [approvedDetails, setApprovedDetails] = useState([]);
  const [bankModal, setBankModal] = useState(false)
  const [bankDetails, setBankDetails] = useState([]);
  const [selectStateUpiId, setSelectedUpiId] = useState("");
  const [upiDetails, setUpiDetails] = useState([]);
  const [stopWithdrawal, setStopWithdrawal] = useState(false);
  const [dayDifference, setDayDifference] = useState(0)



  useEffect(() => {
    fetchRefferalPayout();
    fetchRefferalRequest();
    fetchApprovedRequest();
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formattedAmount = value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    setAmount(formattedAmount);
  };

  const requestRefferalPayout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      memberid: localStorage.getItem("memberid"),
      requestAmount: amount,
      paymentBy: selectStateUpiId
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        `${apiurl}` + "/member/refferal/refferal-payout-request-member",
        data,
        config
      )
      .then((res) => {
        message.success("Requested sent");
        fetchRefferalPayout();
        setAmount("");
        setSelectedUpiId("")
      })
      .catch((err) => {
        message.warning(err.response.data.message);
      });
  };


  const fetchRefferalPayout = () => {
    let token = localStorage.getItem('token');
    let memberid = localStorage.getItem('memberid');
    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    const data = {
      memberid: memberid
    }
    axios.post(`${apiurl}` +'/member/refferal/member-fetch-refferal-payout', data, config)
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
    axios.post(`${apiurl}` +'/member/refferal/fetch-member-refferal-payout-request-withdrawal', data, config)
      .then((res) => {
        const length = res.data.memberWithdrawalRequest.length;
        const lastData = res.data.memberWithdrawalRequest[length - 1];
        const lastDate = res.data.memberWithdrawalRequest[length - 1].requestDate;
        const formattedDate = new Date(lastDate).toLocaleDateString();
        const parts = formattedDate.split('/');
        const month = parts[0];
        const day = parts[1];
        const year = parts[2];
        const finalDate = `${day}/${month}/${year}`;
        setLastDate(finalDate);
        const formattedAmount = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(lastData.walletAmount)
        setLastAmount(formattedAmount);
        setRequestDetails(res.data.memberWithdrawalRequest);
        fetchRefferalPayout();

      })
      .catch(err => {
      })
  }

  // fetch approved request--
  const fetchApprovedRequest = () => {
    let token = localStorage.getItem("token");
    let data = {
      memberid: localStorage.getItem("memberid"),
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        `${apiurl}` +
        "/member/refferal/member-fetch-refferal-payout-approve-withdrawal",
        data,
        config
      )
      .then((res) => {
        setApprovedDetails(res.data.memberApproveWithdrawal);
      })
      .catch((err) => {
      });
  };
  //data ---------
  const requestColumns = [
    {
      title: "Member ID",
      dataIndex: "memberid",
      key: "memberid",
    },
    {
      title: "Amount",
      dataIndex: "walletAmount",
      key: "walletAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Bank/UPI",
      dataIndex: "paymentBy",
      key: "paymentBy"
    },
    {
      title: "Withdraw Date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
  ];

  const approvedColumns = [
    {
      title: "Member ID",
      dataIndex: "memberid",
      key: "memberid",
    },
    {
      title: "Amount",
      dataIndex: "walletAmount",
      key: "walletAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Bank/UPI",
      dataIndex: "paymentBy",
      key: "paymentBy"
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "Approved Date",
      dataIndex: "approvedDate",
      key: "approvedDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
  ];



  // bank modal
  const openBankSelectModal = () => {
    setBankModal(true)
    let token = localStorage.getItem("token");
    let data = {
      userId: localStorage.getItem("memberid"),
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(`${apiurl}` +'/member/get-member-own-bank-details', data, config)
      .then((res) => {
        setBankDetails(res.data.memberBankDetails)
      })
      .catch((err) => {
      })

    axios.post(`${apiurl}` +'/member/get-member-own-upi', data, config)
      .then((res) => {
        setUpiDetails(res.data.memberUpiId)
      })
      .catch((err) => {
      
      })

    let data1 = {
      memberid: localStorage.getItem("memberid"),
    }
    axios.post(`${apiurl}` +'/member/fetch-member-details-member-side', data1, config)
      .then((res) => {
        const isoDateString = res.data.result.verifyDate;
        const convertedDateString = isoDateString.substring(0, 10);
        const currentDate = new Date();
        const date = new Date(convertedDateString);
        const differenceInMilliseconds = currentDate - date;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        setDayDifference(7 - differenceInDays)
        if (differenceInDays > 7) {
          setStopWithdrawal(true)
        }
      })
      .catch((err) => {
        
      })

  }
  const closeBankModal = () => {
    setBankModal(false)
  }

  const handleRadioChangeStateValue = (e) => {
    setSelectedUpiId(e.target.value);
  }

  const gotoHome = ()=> {
    navigate('/userdashboard/dashboard');
  }

  return (
    <>
      <div className="reffer-container">
        <div className="reffer-header">
          <div className="d-flex"><BiArrowBack onClick={gotoHome} style={{cursor:'pointer',marginTop:'5px'}}/>&nbsp;<p>Withdrawal History</p></div>
        </div>


        <div class="card-container">
          <div class="card">
            <p>Total Wallet Amount</p>
            <h6>Total Wallet Amount:<strong> {payoutAmout}</strong></h6>

          </div>
          <div class="card">
            <div className="d-flex justify-content-between"><p>Withdrawal</p><Button type="primary" style={{ cursor: "pointer" }} onClick={openBankSelectModal}><BsPlusCircle />&nbsp;Select Bank</Button></div>
            <label htmlFor="">Enter Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              prefix={<FaRupeeSign />}
            />
            <Button onClick={requestRefferalPayout} disabled={!selectStateUpiId} style={{marginTop:"2px"}}>Withdraw</Button>
          </div>
          <div class="card">
            <p>Last Withdrawal</p>
            <h6>Amount: {lastAmount ? lastAmount : "0.00"}</h6>
            <strong>Last Date: {lastDate ? endDate(lastDate) : "00-00-0000"}</strong>
          </div>
        </div>
        <br />
        <div className="table-box">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Request" key="1">
              <div style={{ overflow: "auto", }}>
                <Table columns={requestColumns} dataSource={requestDetails} />
              </div>
            </TabPane>
            {/* approvedDetails */}
            <TabPane tab="Approved" key="2">
              <div style={{ overflow: "auto", }}>
                <Table columns={approvedColumns} dataSource={approvedDetails} />
              </div>
            </TabPane>

          </Tabs>
        </div>
      </div>


      {/* bank modal */}
      <Modal
        title="Select bank account or UPI ID"
        open={bankModal}
        onCancel={closeBankModal}
        footer={null}
      >
        {stopWithdrawal?<Tabs defaultActiveKey="1">
          <TabPane tab="Bank" key="1">
            <Radio.Group onChange={handleRadioChangeStateValue} value={selectStateUpiId}>
              {bankDetails.map((option) => (
                <Radio key={option.bankName} value={option.bankName}>
                  {option.bankName}
                </Radio>
              ))}
            </Radio.Group>
          </TabPane>
          <TabPane tab="UPI" key="2">
            <Radio.Group onChange={handleRadioChangeStateValue} value={selectStateUpiId}>
              {upiDetails.map((option) => (
                <Radio key={option.upiId} value={option.upiId}>
                  {option.upiId}
                </Radio>
              ))}
            </Radio.Group>
          </TabPane>
        </Tabs>:<p style={{color:"red"}}>You can withdraw after {dayDifference} days.</p>}
      </Modal>
    </>
  );
};

export default RefferalPayout;
