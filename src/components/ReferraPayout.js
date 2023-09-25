import React, { useEffect, useState } from "react";
import "../css/referralPayout.css";
import { Table, Tabs } from "antd";
import moment from "moment";
import axios from "axios";
import baseUrl from "../baseUrl";
import TabPane from "antd/es/tabs/TabPane";
const apiurl = baseUrl.apiUrl;

const ReferraPayout = () => {
  const [myTeam, setMyTeam] = useState([]);
  const memberID = localStorage.getItem("memberid");
  const memberToken = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("1");

  const changeHandler = (key) => {
    setActiveTab(key);
  }

  useEffect(() => {
    memberDetails();
  },[]);

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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const columns = [
    {
      title: "Reffer Trader ID",
      dataIndex: "refferUserId",
      key: "userid",
    },
    {
      title: "Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (amount) => {
        // Format the amount with two decimal places
        const formattedAmount = parseFloat(amount).toFixed(2);
        return <span>₹{formattedAmount}</span>;
      },
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
  ];
  return (
    <div>
      <div className="myteam-container">
        <div className="myteam-header">
          <p>Referral Payout</p>
        </div>
        <div>
          <Tabs activeKey={activeTab} onChange={changeHandler}>
          <TabPane tab="Member Payout" key={1}>
            <Table
              dataSource={myTeam}
              columns={[
                ...columns,
                {
                  title: "Joining Date",
                  dataIndex: "joininigDate",
                  key: "joininigDate",
                  render: (joininigDate) => {
                    // Format the date using moment.js
                    const formattedDate =
                      moment(joininigDate).format("YYYY-MM-DD HH:mm");

                    return <span>{formattedDate}</span>;
                  },
                },
              ]}
            />
            </TabPane>
            </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReferraPayout;
