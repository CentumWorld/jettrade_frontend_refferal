import React, { useEffect, useState } from "react";
import "../css/referralPayout.css";
import { Table, Tabs, Input } from "antd";
import moment from "moment";
import axios from "axios";
import baseUrl from "../baseUrl";
import TabPane from "antd/es/tabs/TabPane";
import { useNavigate } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi'


const apiurl = baseUrl.apiUrl;
const memberID = localStorage.getItem("memberid");
const memberToken = localStorage.getItem("token");

const { Search } = Input;

const ReferralPayout = () => {

  const navigate = useNavigate()
  const [myTeam, setMyTeam] = useState([]);
  const [filteredMyTeam, setFilteredMyTeam] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("1");

  const changeHandler = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    memberDetails();
  }, []);

  const memberDetails = () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${memberToken}` },
      };

      const data = {
        memberId: memberID,
      };
      axios
        .post(
          `${apiurl}` +
            "/member/get-own-member-credit-wallet-transaction-details",
          data,
          config
        )
        .then((res) => {
          setMyTeam(res.data.memberTransactions);
        })
        .catch((err) => {});
    } catch (err) {}
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = myTeam.filter((record) => {
      return (
        record.refferUserId.toLowerCase().includes(value.toLowerCase()) ||
        record.Type.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredMyTeam(filteredData);
  };

  const columns = [
    {
      title: "Referrer Trader ID",
      dataIndex: "refferUserId",
      key: "userid",
    },
    {
      title: "Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (amount) => {
        const formattedAmount = parseFloat(amount).toFixed(2);
        return <span>₹{formattedAmount}</span>;
      },
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
    {
      title: "Joining Date",
      dataIndex: "joininigDate",
      key: "joininigDate",
      render: (joininigDate) => {
        const formattedDate = moment(joininigDate).format("YYYY-MM-DD HH:mm");
        return <span>{formattedDate}</span>;
      },
    },
  ];

  const paginationConfig = {
    pageSize: 7,
  };

  const gotoHome = ()=> {
    navigate("/");
  }

  return (
    <div>
      <div className="myteam-container">
        <div className="myteam-header">
          <div className="d-flex" >
            <BiArrowBack onClick={gotoHome} style={{ cursor: "pointer",color:'wheat',marginTop:'5px' }} />
            &nbsp;<p>Referral Payout</p>
          </div>
          <Search
            placeholder="Search by User ID or Type"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
          />
        </div>
        <div>
          <Tabs activeKey={activeTab} onChange={changeHandler}>
            <TabPane tab="Member Payout" key="1">
              <Table
                dataSource={searchText ? filteredMyTeam : myTeam}
                columns={columns}
                pagination={paginationConfig}
                scroll={{ x: true }}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReferralPayout;
