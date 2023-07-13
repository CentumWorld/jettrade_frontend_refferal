import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';

function AdminLogin() {
    const { state, dispatch } = useContext(UserContext);
    let navigate = useNavigate()
    const [admin, setAdmin] = useState({
        admin_id: "", admin_password: ""
    })
    const handleInputs = e => {
        setAdmin({ ...admin, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }

    const adminLogin = (e) => {
        e.preventDefault();
        Axios.post("/admin/login", {
            admin_id: admin.admin_id,
            password: admin.admin_password
        })
            .then((response) => {
               dispatch({type:"USER", payload:true});
               localStorage.setItem('login',true)
               admin.admin_id='';
               admin.admin_password="";
                navigate('/admindashboard');

            }).catch((error) => {
                console.log('Not login');
                if (error.response.status === 422) {
                    toast.warning("Please Fill all Details!",{
                        autoClose:2000,
                        theme:"dark"
                    });
                    admin.admin_id='';
                    admin.admin_password="";
                }
                if (error.response.status === 404) {
                    
                    toast.warning("Invalid Credential!",{
                        autoClose:2000,
                        theme:"dark"
                    });
                }
            })

    }

  return (
    <>
         <div className="adminLoginModal modal fade" id="adminLogin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ADMIN LOGIN</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='form-content'>
                                <form onSubmit={adminLogin} autoComplete="off">
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="loginid"> LOGIN ID</label>
                                                <input type="text" name='admin_id' id='loginid' className='form-control' placeholder='Enter login ID'
                                                    value={admin.admin_id}
                                                    onChange={handleInputs}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="password">PASSWORD</label>
                                                <input type="password" name='admin_password' id='password' className='form-control' placeholder='Enter Password'
                                                    value={admin.admin_password}
                                                    onChange={handleInputs}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={adminLogin} className="btn btn-outline-success" data-bs-dismiss="modal">Login</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
    </>
    
  )
}

export default AdminLogin