import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';
import UserRegistration from './UserRegistration';

function UserLogin() {

    const { state, dispatch } = useContext(UserContext);
    let navigate = useNavigate()
    const [user, setUser] = useState({
        userid: "", password: ""
    })
    const [hide, setHide] = useState(true);
    console.log(hide);
    const handleInputs = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }

    const userLogin = (e) => {
        e.preventDefault();
        Axios.post("/user/login", {
            userid: user.userid,
            password: user.password
        })
            .then((response) => {
                dispatch({ type: "USER", payload: true });
                localStorage.setItem('login', true)
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
    }



    return (
        <>
            {hide ?
                
                    <div className="modal fade" id="UserLogin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">User Login</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='form-content'>
                                        <form onSubmit={userLogin} autoComplete="off">
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className='form-group mb-3'>
                                                        <label htmlFor="userid"> LOGIN ID</label>
                                                        <input type="text" name='userid' id='userid' className='form-control' placeholder='Enter login ID'
                                                            value={user.userid}
                                                            onChange={handleInputs}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='row'>
                                                <div className='col'>
                                                    <div className='form-group mb-3'>
                                                        <label htmlFor="password">PASSWORD</label>
                                                        <input type="password" name='password' id='password' className='form-control' placeholder='Enter Password'
                                                            value={user.password}
                                                            onChange={handleInputs}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-outline-primary me-auto " onClick={() => setHide(!hide)} data-bs-toggle="modal" data-bs-target="#userSignUp" aria-current="page" >Sign Up</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    <button type="button" onClick={userLogin} className="btn btn-outline-success" data-bs-dismiss="modal">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                : ''

            }
            <UserRegistration />

        </>
    )
}

export default UserLogin