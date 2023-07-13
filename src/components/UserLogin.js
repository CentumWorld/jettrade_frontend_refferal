import React, { useState, useContext} from 'react'
import '../css/UserLogin.css'
import { useNavigate,NavLink } from 'react-router-dom';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input } from 'antd';
import { UserOutlined,UnlockOutlined } from '@ant-design/icons';

function UserLogin(props) {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     props.func(show);
    const { state, dispatch } = useContext(UserContext);
    let navigate = useNavigate()
    const [user, setUser] = useState({
        userid: "", password: ""
    })
    const [hide, setHide] = useState(true);
    //console.log(hide);
    const handleInputs = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }
   
    const userLogin = (e) => {
        e.preventDefault();
        Axios.post("/member/member-login", {
            memberid: user.userid,
            password: user.password
        })
            .then((response) => {
                console.log(response.data.memberLogin);
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('memberid',response.data.memberLogin.memberid)
                localStorage.setItem('fname',response.data.memberLogin.fname)
                dispatch({ type: "USER", payload: true });
                localStorage.setItem('login', true);
                user.userid = '';
                user.password = "";
                navigate('/userdashboard');

            }).catch((error) => {
                console.log('Not login');
                if (error.response.status === 422) {
                    toast.warning("Please Fill all Details!", {
                        autoClose: 2000,
                        theme: "dark"
                    });
                    user.userid = '';
                    user.password = "";
                }
                if (error.response.status === 404) {
                   
                    toast.warning("Invalid Credential!", {
                        autoClose: 2000,
                        theme: "dark"
                    });
                   
                }
            })
            setShow(false);
    }

    return (
        <>
        <ToastContainer/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Member Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-content'>
                        <form onSubmit={userLogin} autoComplete="off">
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group mb-3'>
                                        <label htmlFor="userid"> LOGIN ID</label>
                                         {/* <input type="text" name='userid' id='userid' className='form-control' placeholder='Enter login ID'
                                            value={user.userid}
                                            onChange={handleInputs}
                                         /> */}
                                         <Input placeholder='Enter login ID ' 
                                         prefix={<UserOutlined/>} 
                                         value={user.userid}
                                         name='userid'
                                         allowClear
                                         onChange={handleInputs}/>
                                    </div>
                                </div>

                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group mb-3'>
                                        <label htmlFor="password">PASSWORD</label>
                                        {/* <input type="password" name='password' id='password' className='form-control' placeholder='Enter Password'
                                            value={user.password}
                                            onChange={handleInputs}
                                        /> */}
                                         <Input.Password placeholder='Enter your password'
                                            prefix={<UnlockOutlined />}
                                            value={user.password}
                                            name='password'
                                            onChange={handleInputs}
                                         />
                                    </div>
                                </div>

                            </div>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant='primary' className='user_signup_button me-auto'  >Sign Up</Button> */}
                    {/* <NavLink to="/user-registration" onClick={handleClose}>Sign Up</NavLink> */}

                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-success" onClick={userLogin}>
                        Login
                    </Button>
                   
                </Modal.Footer>
            </Modal>
            
        </>
    );


}

export default UserLogin