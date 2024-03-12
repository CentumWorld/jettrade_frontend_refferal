import React, { useState, createContext } from "react";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/UserRegistration.css";
import {
  Select,
  Input,
  Radio,
  DatePicker,
  Button,
  message,
  Typography,
  Spin,
} from "antd";

import {
  MailOutlined,
  FlagOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl;
const { TextArea } = Input;
const { Text } = Typography;

const { Option } = Select;
export const UseParamContext = createContext();

function UserRegistration() {
  // --------------------------------------

  // -----------------------------
  const customSuffixIcon = <CalendarOutlined style={{ color: "#5e72e4" }} />;
  const [phone, setPhone] = useState("");

  const [memberData, setMemberData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    aadhar_no: "",
    pan_no: "",
    memberid: "",
    password: "",
    foregien_id: "",
    refferedId: "",
  });
  const [panError, setPanError] = useState(false);
  const [aadharError, setAadharError] = useState(false);

  const [aadharImage, setAadharImage] = useState({
    file: null,
  });
  const [aadharBackImage, setAadharBackImage] = useState({
    file: null,
  });
  const [panImage, setPanImage] = useState({
    file: null,
  });
  const [foregienCard, setForegienCard] = useState({
    file1: null,
  });
  const [spin, setSpin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const memberInputs = (e) => {
    e.preventDefault();
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  //handle front aadhar image function
  const handleClickAadharFrontImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setAadharImage({ file: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      aadharImage.file = null;
    }
  };
  //hadle back aadhar image function
  const handleClickAadharBackImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setAadharBackImage({ file: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      aadharBackImage.file = null;
    }
  };
  //hadle pan card image function
  const handleClickPanCardImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setPanImage({ file: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      panImage.file = null;
    }
  };

  // foregien card
  const handleClickForeignCard = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setForegienCard({ file1: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      foregienCard.file1 = null;
    }
  };

  const pan = (e) => {
    e.preventDefault();
    setMemberData({ ...memberData, pan_no: e.target.value });
    let panLength = e.target.value;
    if (panLength.length === 10) {
      setPanError(false);
    } else {
      setPanError(true);
    }
  };
  const aadhar = (e) => {
    setMemberData({ ...memberData, aadhar_no: e.target.value });
    let aadharLength = e.target.value;
    if (aadharLength.length === 12) {
      setAadharError(false);
    } else {
      setAadharError(true);
    }
  };
  function home() {
    navigate("/");
  }
  const submit = (e) => {
    setSpin(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", memberData.fname);
    formData.append("lname", memberData.lname);
    formData.append("email", memberData.email);
    formData.append("phone", memberData.phone);
    formData.append("address", memberData.address);
    formData.append("gender", memberData.gender);
    formData.append("dob", memberData.dob);
    formData.append("reffered_id", memberData.refferedId);
    formData.append("memberid", memberData.memberid);
    formData.append("password", memberData.password);

    if (countryCode === "91") {
      formData.append("aadhar", memberData.aadhar_no);
      formData.append("aadhar_front_side", aadharImage.file);
      formData.append("aadhar_back_side", aadharBackImage.file);
      formData.append("pan_card", panImage.file);
      formData.append("pan", memberData.pan_no);
    } else {
      formData.append("Id_No", memberData.foregien_id);
      formData.append("ID_Card", foregienCard.file1);
    }

    if (countryCode === "91") {
      axios
        .post(`${apiurl}` + "/member/member-registration", formData)
        .then((res) => {
          setMemberData({
            fname: "",
          });
          message.success("Registration successful");
          setSpin(false);
          navigate("/member-login");
        })
        .catch((error) => {
          message.warning(error.response.data.message);
          setSpin(false);
        });
    } else {
      axios
        .post(
          `${apiurl}` + "/member/refferal/other-country-member-registration",
          formData
        )
        .then((res) => {
          message.success("Registration successful");
          navigate("/member-login");
          setSpin(false);
        })
        .catch((error) => {
          message.warning(error.response.data.message);
          setSpin(false);
        });
    }
  };
  //date of birth
  const handleDateOfBirthChange = (date, dateString) => {
    setMemberData((memberData) => ({
      ...memberData,
      dob: dateString,
    }));
  };

  const [selectedOption, setSelectedOption] = useState("referral");
  const [referralId, setReferralId] = useState("");
  const officialId = "FC-FRA3894";
  const [countryCode, setCountryCode] = useState("");

  const handleDropdownChange = (value) => {
    console.log(value)
    setSelectedOption(value);
    setReferralId("");
    setMemberData({ ...memberData, refferedId: officialId });
  };

  const hadleRefferalId = (value) => {
    setReferralId(value);
    setMemberData({ ...memberData, invite_code: value });
  };

  const handlePhoneChange = (value) => {
    const str = value;
    const firstTwoLetters = str.substring(0, 2);
    setCountryCode(firstTwoLetters);
    setPhone(value);
    setMemberData({ ...memberData, phone: value });
  };

  return (
    <>
      <div className="registration-page">
        <div className="registration-body">
          <h4>Welcome to JET TRADE FX</h4>
          <p>Sign up with credentials</p>
          <div className="form-content">
            <form>
              <div className="first_name">
                <Select value={selectedOption} onChange={handleDropdownChange}>
                  <Option value="official">Official ID</Option>
                  <Option value="referral"> Put Referral ID</Option>
                </Select>
                {selectedOption === "official" && (
                  <Input
                    className="custom-placeholder-input"
                    placeholder="Enter referred Id"
                    value={officialId}
                    style={{ marginBottom: "10px", width: "min-content" ,backgroundColor:"#fff"}}
                    disabled
                  />
                )}

                {selectedOption === "referral" && (
                  <Input
                    className="custom-placeholder-input"
                    placeholder="Enter referred Id"
                    name="refferedId"
                    value={memberData.refferedId}
                    onChange={memberInputs}
                    style={{ marginBottom: "10px", width: "min-content" }}
                  />
                )}
              </div>

              <div className="first_name">
                <p>First Name</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter first name"
                  name="fname"
                  value={memberData.fname}
                  onChange={memberInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="first_name">
                <p>Last Name</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder=" Enter last name"
                  name="lname"
                  value={memberData.lname}
                  onChange={memberInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="first_name">
                <p>Email</p>
                <Input
                  className="custom-placeholder-input"
                  prefix={<MailOutlined />}
                  placeholder=" Enter email"
                  name="email"
                  type="email"
                  value={memberData.email}
                  onChange={memberInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="first_name">
                <p>Phone</p>
                <PhoneInput
                  className="custom-placeholder-input"
                  defaultCountry="US"
                  placeholder=" Enter phone Number"
                  name="phone"
                  countrySelectProps={{ suffixIcon: <FlagOutlined /> }}
                  inputComponent={Input}
                  value={memberData.phone}
                  onChange={handlePhoneChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="first_name">
                <p>Address</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter Address"
                  name="address"
                  value={memberData.address}
                  onChange={memberInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="gender-dob">
                <div className="gender-dob-section">
                  <p>Gender</p>
                  <Radio.Group
                    name="gender"
                    value={memberData.gender}
                    onChange={memberInputs}
                    style={{ marginBottom: "10px" }}
                  >
                    <Radio value="male" style={{ color: "white" }}>
                      Male
                    </Radio>
                    <Radio value="female" style={{ color: "white" }}>
                      Female
                    </Radio>
                    <Radio value="other" style={{ color: "white" }}>
                      Other
                    </Radio>
                  </Radio.Group>
                </div>

                <div className="gender-dob-section">
                  <p>DOB</p>
                  <DatePicker
                    className="custom-datepicker"
                    placeholder="Select a Date"
                    onChange={handleDateOfBirthChange}
                    style={{ marginBottom: "10px" }}
                    suffixIcon={customSuffixIcon}
                  />
                </div>
              </div>
              {/* ----------------------------- */}
              {countryCode === "91" ? (
                <>
                  <div className="first_name">
                    <p>Aadhar No......</p>
                    <Input
                      className="custom-placeholder-input"
                      placeholder=" Enter Aadhar no."
                      type="text"
                      name="aadhar_no"
                      maxLength="12"                   
                      onChange={memberInputs}
                      style={{ marginBottom: "10px" }}
                    />
                    {errorMessage && <Text type="danger">{errorMessage}</Text>}
                  </div>
                  <div className="aadhar-front">
                    <p>Aadhar Front</p>
                    <div>
                      <Input
                        placeholder="Aadhar Front Image"
                        type="file"
                        onChange={handleClickAadharFrontImage}
                        accept=".jpg, .jpeg, .png" 
                      />
                    </div>
                  </div>

                  <div className="aadhar-back">
                    <p>Aadhar Back</p>
                    <div>
                      <Input
                        placeholder="Aadhar back Image"
                        type="file"
                        onChange={handleClickAadharBackImage}
                        accept=".jpg, .jpeg, .png" 
                      />
                    </div>
                  </div>

                  <div className="pan_number">
                    <p>Pan No.</p>
                    <Input
                      className="custom-placeholder-input"
                      placeholder=" Enter Pan no."
                      type="text"
                      name="pan_no"
                      onChange={memberInputs}
                      style={{ marginBottom: "10px" }}
                    />
                  </div>

                  <div className="pan_card">
                    <p>Pan Card</p>
                    <div>
                      <Input
                        className="custom-placeholder-input"
                        placeholder="Pan card"
                        accept=".jpg, .jpeg, .png" 
                        type="file"
                        onChange={handleClickPanCardImage}
                        style={{ marginBottom: "10px" }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="input_label">
                    <p>ID Number</p>
                    <Input
                      className="custom-placeholder-input"
                      placeholder="Enter ID no."
                      type="text"
                      name="foregien_id"
                      onChange={memberInputs}
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                  <div className="pan_card">
                    <p>ID Card</p>
                    <div>
                      <Input
                        placeholder="Upload ID Card"
                        type="file"
                        onChange={handleClickForeignCard}
                        accept=".jpg, .jpeg, .png" 
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="password-input">
                <p>Member ID</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter your member ID"
                  value={memberData.memberid}
                  name="memberid"
                  onChange={memberInputs}
                />
              </div>
              <div className="password-input">
                <p>Password</p>
                <Input.Password
                  className="custom-placeholder-input"
                  placeholder="Enter your password"
                  value={memberData.password}
                  name="password"
                  onChange={memberInputs}
                />
              </div>

              <div className="submit-footer">
                <Button type="primary" onClick={submit}>
                  {spin ? <Spin style={{ color: "white" }} /> : "Register"}
                </Button>
                <Button
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={home}
                >
                  Home
                </Button>
                <p style={{ float: "right" }}>
                  Already registered <NavLink to="/member-login">Login</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegistration;
