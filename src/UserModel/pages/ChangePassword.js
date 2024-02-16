import React, { useState } from "react";
import "../../css/ChangePassword.css";
import { Input, message } from "antd";
import axios from "axios";
import baseUrl from "../../baseUrl";

const apiurl = baseUrl.apiUrl;

function ChangePassword() {
  const [selectDiv, setSelectDiv] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function onChangeValue(event) {
    setSelectDiv(event.target.value);
    console.log(event.target.value);
  }

  const changePasswordFunction = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitChangePassword = () => {
    if (formData.oldPassword === "") {
      message.warning("Please enter old password !!");
    } else if (formData.newPassword === "") {
      message.warning("Please enter new password !!");
    } else {
      const token = localStorage.getItem("token");
      let data = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(`${apiurl}` + "/member/member-change-password", data, config)
        .then((res) => {
          message.success(res.data.message);
          setFormData("");
        })
        .catch((err) => {
          message.error("Server error !!");
        });
    }
  };
  return (
    <>
      <div className="change_password">
        <div className="change_password_card">
          <div className="row">
            <div className="change_password_heading ">
              <p>Password Management</p>
            </div>
            <div className="change_password_para">
              <p>
                Here you can change and reset your JettradeFX PIN, Personal Area
                password, and passwords for all your trading accounts.
              </p>
            </div>
          </div>
          <div className="change_password_label ">
            <p>Change Password</p>
            <hr />
          </div>
          <div className="select_password_type_info">
            <p>Select a password or PIN</p>

            <div className="password_radio_select">
              <div onChange={onChangeValue}>
                <input type="radio" name="pin" value="FXPIN" />
                &nbsp;
                <label htmlFor="html">JettradeFX PIN </label>
              </div>
              <div onChange={onChangeValue}>
                <input type="radio" name="pin" value="PERSONALPIN" />
                &nbsp;
                <label htmlFor="html">Personal area Pin</label>
              </div>
            </div>
          </div>
          {selectDiv === "FXPIN" ? (
            <div className="fx_pin">
              <div className="password_form">
                <div className="newpassword form-group">
                  <label htmlFor="new_password">New</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New password"
                  />
                </div>
                <div className="password_form">
                  <div className="newpassword form-group">
                    <label htmlFor="new_password">Repeat</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Repeat password"
                    />
                  </div>
                </div>
                <div className="change_password_submit">
                  <button className="btn btn-primary">Change</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="fx_pin">
              <div className="password_form">
                <div className="newpassword form-group">
                  <label htmlFor="new_password">Old Password</label>
                  <Input.Password
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={changePasswordFunction}
                    placeholder="Old Password"
                  />
                </div>
                <div className="password_form">
                  <div className="newpassword form-group">
                    <label htmlFor="new_password">New Password</label>
                    <Input.Password
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={changePasswordFunction}
                      placeholder="New Password"
                    />
                  </div>
                </div>
                <div className="change_password_submit">
                  <button
                    className="btn btn-primary"
                    onClick={submitChangePassword}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
