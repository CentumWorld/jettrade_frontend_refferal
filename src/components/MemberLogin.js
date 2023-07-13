import React, { useState, useContext , useEffect} from 'react'
import '../css/MemberLogin.css';
import { Input, message, Button } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from '../App';

const MemberLogin = () => {

    const [show, setShow] = useState(true);
    const { state, dispatch } = useContext(UserContext);
    let navigate = useNavigate()
    const [member, setMember] = useState({
        memberid: "", password: ""
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [hide, setHide] = useState(true);
    const handleInputs = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }
    //Remember me

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };


    useEffect(() => {
        const storeUserID = localStorage.getItem('userid');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe');
    
        if (storedRememberMe === 'true') {
          setMember({memberid:storeUserID,password:storedPassword});
        //   setMember({password:storedPassword});
          setRememberMe(true);
        }
      }, []);

      console.log(member.memberid);

    // --------------
    const memberLogin = (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('userid', member.memberid);
            localStorage.setItem('password', member.password);
            localStorage.setItem('rememberMe', true);
        } else {
            // If "Remember Me" is unchecked, remove the stored login information
            localStorage.removeItem('userid');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }
        Axios.post("/member/member-login", {
            memberid: member.memberid,
            password: member.password,
        })
            .then((response) => {
                dispatch({ type: "USER", payload: true });
                localStorage.setItem('login', true);
                member.memberid = '';
                member.password = "";
                console.log(response.data.memberLogin);
                localStorage.setItem('member', response.data.memberLogin._id);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('memberid', response.data.memberLogin.memberid);
                localStorage.setItem('refferal', response.data.memberLogin.refferal_id);
                localStorage.setItem('fname', response.data.memberLogin.fname)
                navigate('/userdashboard');

            }).catch((error) => {
                console.log('Not login');
                if (error.response.status === 422) {
                    message.warning("Please Fill all Details!");

                    member.memberid = '';
                    member.password = "";
                }
                if (error.response.status === 404) {

                    message.warning("Invalid Credential!");

                }
                if (error.response.status === 401) {
                    message.warning('Your Account is Blocked')
                }

            })
        setShow(false);
    }
    return (
        <>
            <div className='memberLogin-page'>
                <div className='memberLogin-body'>
                <h4>Welcome to JETTRADE FX</h4>
                    <p>Sign in with credentials</p>
                    <div className='row'>
                        <div className='col'>
                            <div className='memberid-section form-group mb-3'>
                                <label htmlFor="memberid" style={{color:'white'}}> LOGIN ID</label>
                                <Input placeholder='Enter user ID '
                                    className='custom-placeholder-memberid'
                                    prefix={<UserOutlined />}
                                    value={member.memberid}
                                    name='memberid'
                                    allowClear
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='password-section form-group mb-3'>
                                <label htmlFor="password" style={{color:'white'}}>PASSWORD</label>

                                <Input.Password placeholder='Enter your password'
                                    className="custom-placeholder-password"
                                    prefix={<UnlockOutlined />}
                                    value={member.password}
                                    name='password'
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='readme'>
                                <label style={{color:'white'}}>
                                    Remember Me &nbsp;
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>

                        <div className='col'>
                            <div className='signin-button'>
                                <Button type="primary" onClick={memberLogin}>
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='home-signup col'>
                            <div className='home'>
                                <NavLink to='/'>Home</NavLink>
                            </div>
                            <div className='signup'>
                                <NavLink to='/member-registration'>Create Account</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MemberLogin