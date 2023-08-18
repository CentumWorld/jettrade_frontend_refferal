import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from 'react-router-dom';
// import UserLogin from './UserLogin';
import '../css/UserRegistration.css';
import { Select, Input, Form, Radio, DatePicker, Button, Upload, message, Typography,Spin } from 'antd';

import { MailOutlined, UserOutlined, FlagOutlined, CalendarOutlined } from '@ant-design/icons';
import { FaAddressCard } from 'react-icons/fa';
//import PhoneInput from 'react-phone-number-input'
//import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl;
const { TextArea } = Input;
const { Text } = Typography;

const { Option } = Select;
export const UseParamContext = createContext();

function UserRegistration() {
    // --------------------------------------

    // -----------------------------
    const customSuffixIcon = (
        <CalendarOutlined style={{ color: '#5e72e4' }} />
    );
    const [phone, setPhone] = useState('')

    const [memberData, setMemberData] = useState({
        fname: "", lname: "", email: "", phone: "", address: "", gender: "", dob: "", aadhar_no: "", pan_no: "", memberid: '', password: "",foregien_id: '', refferedId: "",
    })
    const [panError, setPanError] = useState(false);
    const [aadharError, setAadharError] = useState(false);

    const [aadharImage, setAadharImage] = useState({
        file: null
    })
    const [aadharBackImage, setAadharBackImage] = useState({

        file: null
    })
    const [panImage, setPanImage] = useState({
        file: null
    })
    const [foregienCard, setForegienCard] = useState({
        file1: null
    })
    const [spin, setSpin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    //console.log(userData)
    const memberInputs = e => {
        e.preventDefault();
        setMemberData({ ...memberData, [e.target.name]: e.target.value })

        // if (memberData.aadhar_no.length < 11 || memberData.aadhar_no.length > 11) {
        //     setErrorMessage('Only 12 digit allow!');
        //     setAadharCount(memberData.aadhar_no.length + 1)
        // } else {
        //     setErrorMessage('');
        // }


    }

    //handle front aadhar image function
    const handleClickAadharFrontImage = (e) => {

        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            //preview shoe
            setAadharImage({ file: e.target.files[0] })
        } else {
            message.error("Invalid File !! ");
            aadharImage.file = null;
        }
    }
    //hadle back aadhar image function
    const handleClickAadharBackImage = (e) => {

        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            //preview shoe
            setAadharBackImage({ file: e.target.files[0] })
        } else {
            message.error("Invalid File !! ");
            aadharBackImage.file = null;
        }
    }
    //hadle pan card image function
    const handleClickPanCardImage = (e) => {

        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            //preview shoe
            setPanImage({ file: e.target.files[0] })
        } else {
            message.error("Invalid File !! ");
            panImage.file = null;
        }
    }

    // foregien card
    const handleClickForeignCard = (e) => {
        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            //preview shoe
            setForegienCard({ file1: e.target.files[0] })
        } else {
            message.error("Invalid File !! ");
            foregienCard.file1 = null;
        }
    }

    const pan = (e) => {
        e.preventDefault();
        setMemberData({ ...memberData, pan_no: e.target.value })
        let panLength = e.target.value;
        console.log(memberData.pan_no);
        if (panLength.length === 10) {
            setPanError(false);
        }
        else {
            setPanError(true);
        }
    }
    const aadhar = (e) => {
        setMemberData({ ...memberData, aadhar_no: e.target.value })
        let aadharLength = e.target.value;
        if (aadharLength.length === 12) {
            setAadharError(false);
        }
        else {
            setAadharError(true);
        }
    }
    function home() {
        navigate('/');
    }
    const submit = (e) => {
        setSpin(true);
        e.preventDefault();
        console.log(memberData, phone, aadharImage, aadharBackImage, panImage);
        const formData = new FormData();
        formData.append('fname', memberData.fname);
        formData.append('lname', memberData.lname);
        formData.append('email', memberData.email);
        formData.append('phone', memberData.phone);
        formData.append('address', memberData.address);
        formData.append('gender', memberData.gender);
        formData.append('dob', memberData.dob);
        // formData.append('aadhar', memberData.aadhar_no);
        // formData.append('aadhar_front_side', aadharImage.file);
        // formData.append('aadhar_back_side', aadharBackImage.file);
        // formData.append('pan_card', panImage.file);
        // formData.append('pan', memberData.pan_no);
        //formData.append('pan_upload', memberData.pan_upload);
        // formData.append('reffered_id', memberData.invite_code);
        formData.append('memberid', memberData.memberid);
        formData.append('password', memberData.password);
        console.log(formData, '44');

        if (countryCode === '91') {
            formData.append('aadhar', memberData.aadhar_no);
            formData.append('aadhar_front_side', aadharImage.file);
            formData.append('aadhar_back_side', aadharBackImage.file);
            formData.append('pan_card', panImage.file);
            formData.append('pan', memberData.pan_no);
        } else {
            formData.append('Id_No', memberData.foregien_id);
            formData.append('ID_Card', foregienCard.file1);
        }

        if (countryCode === '91') {
            axios.post('/member/member-registration', formData)
                .then((res) => {
                    setMemberData({
                        fname: "",
                    })
                    message.success('Registration successful');
                    setSpin(false);

                    navigate('/member-login');
                    console.log(res.data)
                }).catch((error) => {

                    message.warning(error.response.data.message)
                    setSpin(false);
                })
        } else {
            axios.post('/member/refferal/other-country-member-registration', formData)
                .then((res) => {
                    message.success('Registration successful');
                    navigate('/member-login');
                    // console.log(res.data)
                    setSpin(false);
                }).catch((error) => {
                    //console.log(error.response.data)
                    message.warning(error.response.data.message)
                    setSpin(false);
                })
        }




    }
    //date of birth
    const handleDateOfBirthChange = (date, dateString) => {
        setMemberData((memberData) => ({
            ...memberData,
            dob: dateString,
        }));
    };

    // -----------------

    const [selectedOption, setSelectedOption] = useState('referral');
    const [referralId, setReferralId] = useState('');
    const officialId = 'admin@123'; // Replace with your official ID
    const [countryCode, setCountryCode] = useState('')

    const handleDropdownChange = (value) => {
        setSelectedOption(value);
        setReferralId('');
        setMemberData({ ...memberData, invite_code: officialId }) // Reset referral ID when changing options
    };

    const hadleRefferalId = (value) => {
        setReferralId(value)
        setMemberData({ ...memberData, invite_code: value })
    }


    // const handlePhoneChange = (value) => {
    //     setPhone(value);
    //     setMemberData({ ...memberData, phone: value })
    // };

    const handlePhoneChange = (value) => {
        const str = value;
        const firstTwoLetters = str.substring(0, 2);
        setCountryCode(firstTwoLetters);
        setPhone(value);
        setMemberData({ ...memberData, phone: value })



    };

    

    return (
        <>
            <div className='registration-page'>
                <div className='registration-body'>
                    <h4>Welcome to JETTRADE FX</h4>
                    <p>Sign up with credentials</p>
                    <div className='form-content'>
                        <form>
                        <div className='first_name'>
                                <p>Reffered ID</p>
                                <Input
                                    className='custom-placeholder-input'
                                    // prefix={<UserOutlined />}
                                    placeholder="Enter reffered Id"
                                    name='refferedId'
                                    value={memberData.refferedId}
                                    onChange={memberInputs}
                                    style={{ marginBottom: '10px', width:"min-content" }}
                                />
                            </div>
                           
                            <div className='first_name'>
                                <p>First Name</p>
                                <Input
                                    className='custom-placeholder-input'
                                    // prefix={<UserOutlined />}
                                    placeholder="Enter first name"
                                    name='fname'
                                    value={memberData.fname}
                                    onChange={memberInputs}
                                    style={{ marginBottom: '10px' }}
                                />
                            </div>
                            <div className='first_name'>
                                <p>Last Name</p>
                                <Input
                                    className='custom-placeholder-input'
                                    //prefix={<UserOutlined />}
                                    placeholder=" Enter last name"
                                    name='lname'
                                    value={memberData.lname}
                                    onChange={memberInputs}
                                    style={{ marginBottom: '10px' }}
                                />
                            </div>

                            {/* antd email input */}
                            <div className='first_name'>
                                <p>Email</p>
                                <Input
                                    className='custom-placeholder-input'
                                    prefix={<MailOutlined />}
                                    placeholder=" Enter email"
                                    name='email'
                                    type="email"
                                    value={memberData.email}
                                    onChange={memberInputs}
                                    style={{ marginBottom: '10px' }}
                                />

                            </div>
                            {/* antd phone */}
                            <div className='first_name'>
                                <p>Phone</p>
                                <PhoneInput
                                    className='custom-placeholder-input'
                                    defaultCountry="US"
                                    placeholder=" Enter phone Number"
                                    name='phone'
                                    countrySelectProps={{ suffixIcon: <FlagOutlined /> }}
                                    inputComponent={Input}
                                    value={memberData.phone}
                                    onChange={handlePhoneChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            </div>

                            <div className='first_name'>
                                <p>Address</p>
                                <Input
                                    className='custom-placeholder-input'
                                    // prefix={<FaAddressCard />}
                                    placeholder="Enter Address"
                                    name='address'
                                    value={memberData.address}
                                    onChange={memberInputs}
                                    style={{ marginBottom: '10px' }}
                                />
                            </div>

                            <div className='gender-dob'>
                                <div className='gender-dob-section'>
                                    <p>Gender</p>
                                    <Radio.Group
                                        name="gender"
                                        value={memberData.gender}
                                        onChange={memberInputs}
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <Radio value="male" style={{color:'white'}}>Male</Radio>
                                        <Radio value="female" style={{color:'white'}}>Female</Radio>
                                        <Radio value="other" style={{color:'white'}}>Other</Radio>
                                    </Radio.Group>
                                </div>

                                <div className='gender-dob-section'>
                                    <p>DOB</p>
                                    <DatePicker
                                        className="custom-datepicker"
                                        placeholder="Select a Date"
                                        onChange={handleDateOfBirthChange}
                                        style={{ marginBottom: '10px' }}
                                        suffixIcon={customSuffixIcon}
                                    />
                                </div>
                            </div>
                            {/* ----------------------------- */}
                            {countryCode === '91' ? <>
                                <div className='first_name'>
                                    <p>Aadhar No.</p>
                                    <Input
                                        className='custom-placeholder-input'
                                        placeholder=" Enter Aadhar no."
                                        type="text"
                                        name='aadhar_no'
                                        onChange={memberInputs}
                                        style={{ marginBottom: '10px' }}

                                    />
                                    {errorMessage && <Text type="danger">{errorMessage}</Text>}
                                </div>


                                {/* <Upload beforeUpload={handleClickAadharFrontImage}
                                    className='aadhar_front_mobile'
                                    
                                    >
                                    <Button icon={<UploadOutlined />}>Upload Aadhar Front</Button>
                                </Upload> */}
                                <div className='aadhar-front'>
                                    <p>Aadhar Front</p>
                                    <div>
                                        <Input
                                            placeholder='Aadhar Front Image'
                                            type="file"
                                            //style={{ display: 'none' }}
                                            onChange={handleClickAadharFrontImage}
                                        />
                                    </div>
                                </div>

                                <div className='aadhar-back'>
                                    <p>Aadhar Back</p>
                                    <div>
                                        <Input
                                            placeholder='Aadhar back Image'
                                            type="file"
                                            //style={{ display: 'none' }}
                                            onChange={handleClickAadharBackImage}
                                        />
                                    </div>
                                </div>

                                <div className='pan_number'>
                                    <p>Pan No.</p>
                                    <Input
                                        className='custom-placeholder-input'
                                        placeholder=" Enter Pan no."
                                        type="text"
                                        name='pan_no' 
                                        onChange={memberInputs}
                                        style={{ marginBottom: '10px' }}
                                    //style={{ width: '500px', height: '40px' , marginBottom: '10px' }}
                                    />
                                </div>

                                <div className='pan_card'>
                                    <p>Pan Card</p>
                                    <div>
                                        <Input
                                            className='custom-placeholder-input'
                                            placeholder='Pan card'
                                            type="file"
                                            //style={{ display: 'none' }}
                                            onChange={handleClickPanCardImage}
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                </div>

                            </> : <>
                                <div className='input_label'>
                                    <p>ID Number</p>
                                    <Input
                                        className='custom-placeholder-input'
                                        placeholder="Enter ID no."
                                        type="text"
                                        name='foregien_id'
                                        onChange={memberInputs}
                                        style={{ marginBottom: '10px' }}

                                    />
                                </div>
                                <div className='pan_card'>
                                    <p>ID Card</p>
                                    <div>
                                        <Input
                                            placeholder='Upload ID Card'
                                            type="file"
                                            //style={{ display: 'none' }}
                                            onChange={handleClickForeignCard}
                                        />
                                    </div>
                                </div>
                            </>}
                            <div className='password-input'>
                                <p>User ID</p>
                                <Input
                                    className='custom-placeholder-input'
                                    placeholder="Enter your member ID"
                                    value={memberData.memberid}
                                    name='memberid'
                                    onChange={memberInputs}
                                // style={{ marginBottom: '10px' }}
                                />
                            </div>
                            <div className='password-input'>
                                <p>Password</p>
                                <Input.Password
                                    className='custom-placeholder-input'
                                    placeholder="Enter your password"
                                    value={memberData.password}
                                    name='password'
                                    onChange={memberInputs}
                                // style={{ marginBottom: '10px' }}
                                />
                            </div>

                            <div className="submit-footer">

                                <Button type='primary' onClick={submit} >{spin ? <Spin style={{ color: 'white' }} /> : 'Register'}</Button>
                                <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={home}>Home</Button>
                                <p style={{ float: 'right' }}>Already registered <NavLink to='/member-login' >Login</NavLink></p>

                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}

export default UserRegistration