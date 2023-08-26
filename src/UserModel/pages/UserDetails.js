import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import '../../css/UserDetails.css';
import profile from '../../img/user_profile.png'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { message,Spin,Button,Row, Col, Input, Select, DatePicker,Modal } from 'antd';
import moment from 'moment';
import baseUrl from '../../baseUrl';


const apiurl = baseUrl.apiUrl
const { Option } = Select;

const UserDetails = () => {



  const [memberData, setMemberData] = useState({ fname: '', lname: '', phone: '', email: '', dob: '', status: '', memberid: '', refferal: '' });
  //state for hadle image
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsEditModalVisible] = useState(false);
  const id = localStorage.getItem('member');
  const [image, setImage] = useState({
    placeholder: profile,
    file: null
  });
  const [editMemberData, setEditMemberData] = useState({
    fname: '',
    lname: '',
    phone: '',
    gender: '',
    address: '',
    aadhar: '',
    pan: '',
    dob: null,
  });

//edit Model 
  const editModal = () => {
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };


  useEffect(() => {
    fetchData();
    fetchMemberProfilePhoto(localStorage.getItem('memberid'));
    fetchMemberDetailsForEdit();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    let data = {
      memberid: localStorage.getItem('memberid')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    };
    try {
      const response = await axios.post('/member/fetch-member-details-member-side', data, config);
      console.log(response.data, '58');
      if (response) {
        console.log(response.data.result);
        setMemberData({
          memberid: response.data.result.memberid,
          fname: response.data.result.fname, lname: response.data.result.lname, phone: response.data.result.phone,
          email: response.data.result.email, dob: moment(response.data.result.dob).format('DD/MM/YYYY'), status: response.data.result.status,
          refferal: response.data.result.refferal_id
        });
        fetchMemberProfilePhoto();

      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchMemberProfilePhoto = async () => {
    const token = localStorage.getItem('token');
    let data = {
      memberid: localStorage.getItem('memberid')

    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    };
    try {
      const response = await axios.post('/member/fetch-member-profile-photo', data, config);
      console.log(response.data.result, '61');
      setImage({ placeholder: response.data.result[0].imageUrl })
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log(memberData)

  // function for upload profile


  const uploadMemberProfile = (event) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    event.preventDefault();
    var formData = new FormData();
    formData.append('image', image.file);
    formData.append('memberid', localStorage.getItem('memberid'));
    //console.log(formData);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    }

    axios.post('/member/member-profile-photo-upload', formData, config)
      .then((res) => {
        if (res) {
          setLoading(false);
          message.success('Profile picture uploaded !');
          fetchData();
        }
      })
      .catch((err) => { })


  }


   //function for image change
   const handleProfileImageChange = (e) => {

    //e.preventDefault();

    document.getElementById('file-input').click();

    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      //preview shoe
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage({
          placeholder: reader.result,
          file: e.target.files[0]

        })

      }
      reader.readAsDataURL(e.target.files[0])

      //uploadProfile(e.target.files[0]);
    } else {
      toast.error("Invalid File !! ");
      image.file = null;
    }
  }

  const fetchMemberDetailsForEdit = () => {
    const token = localStorage.getItem('token')
    const memberid = localStorage.getItem('memberid');
    let data = {
      memberid: memberid,

    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      }
    }
    axios.post('/member/refferal/edit-member-details', data, config)
      .then((result) => {
        console.log(result.data.result[0].fname,
          result.data.result[0].lname
        );
        setEditMemberData(
          {
            fname: result.data.result[0].fname,
            lname: result.data.result[0].lname,
            phone: result.data.result[0].phone,
            address: result.data.result[0].address,
            dob: result.data.result[0].dob,
            aadhar: result.data.result[0].aadhar,
            pan: result.data.result[0].pan,
            gender: result.data.result[0].gender,

          })

      })
      .catch((error) => {
        console.log(error);
      })
  }

  const editInputChange = (e) => {
    const { name, value } = e.target;
    setEditMemberData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setEditMemberData((prevFormData) => ({
      ...prevFormData,
      gender: value,
    }));
  };

  const handleDobChange = (date) => {
    setEditMemberData((prevFormData) => ({
      ...prevFormData,
      dob: date,
    }));
  };
  // save edit value
  const editModalSubmit = (e) => {
    e.preventDefault()
    const data = {
      memberid : localStorage.getItem('memberid'),
      fname: editMemberData.fname,
      lname: editMemberData.lname,
      phone: editMemberData.phone,
      address: editMemberData.address,
      dob: editMemberData.dob,
      aadhar: editMemberData.aadhar,
      pan: editMemberData.pan,
      gender: editMemberData.gender,
    };
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      }
    }
    axios.post('/member/refferal/save-member-edited-details', data, config)
    .then((res) => {
      message.success('Updated Successfully');
      setIsEditModalVisible(false);
    })
    .catch((err) => {
      message.warning('Something went wrong!')
    })

  }


  return (
    <>
      <div className='user_details'>
        <div className='user_card'>

          <div className='row'>
            <div className='user_details_heading'>
              <div className='user_main_heading'>
                <p>Your personal information</p>
                <Button type="primary" style={{ borderRadius: '12px' }} onClick={editModal}>
                  Edit Details
                </Button>
              </div>
              <div className='user_main_heading_paragraph'>
                <p>Here you can view and change your personal information on our platform. Please note that the details should be correct and up-to-date.</p>
              </div>
            </div>
          </div>
          <div className='user_deatails_main_div row'>
            <div className='user_details_content col-md-8'>
              <div className='row'>
                <div className='row_content'>
                  <div className='user_head'>
                    <h6>Email</h6>
                  </div>
                  <div className='user_head_data'>
                    <h6>{memberData.email}</h6>
                    {/* <span><NavLink to={''}>change</NavLink></span> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='row_content'>
                  <div className='user_head'>
                    <h7>Phone</h7>
                  </div>
                  <div className='user_head_data'>
                    <h6>{memberData.phone}</h6>
                    {/* <span><NavLink to={''}>change</NavLink></span> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='row_content'>
                  <div className='user_head'>
                    <h6>Name</h6>
                  </div>
                  <div className='user_head_data'>
                    <h6>{memberData.fname}&nbsp;{memberData.lname}</h6>
                  </div>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='row_content'>
                  <div className='user_head'>
                    <h6>Birthdate</h6>
                  </div>
                  <div className='user_head_data'>
                    <h6>{memberData.dob}</h6>
                  </div>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='row_content'>
                  <div className='user_head'>
                    <h6>Country</h6>
                  </div>
                  <div className='user_head_data'>
                    <h6>IND</h6>

                  </div>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='row_content'>
                  <div className='user_head'>
                    <h6>Verification status</h6>
                  </div>
                  <div className=''>
                    <h6>{!memberData.status ? <span style={{ color: 'red' }}>Not Verified</span> : <span style={{ color: 'green' }}>Verified</span>}</h6>
                    <span><NavLink to={''}>Get Verified</NavLink></span>
                  </div>
                </div>
              </div>
              <hr />

            </div>
            <div className='user_profile col-md-4'>
              <div className='pic'>
                <form onSubmit={uploadMemberProfile}>
                <input
                    id="file-input"
                    type="file"
                    style={{ display: 'none' }}
                    name='file1'
                    onChange={handleProfileImageChange}
                  />
                  <label htmlFor="file-input" >
                  <img src={image.placeholder} alt=""  />
                  </label>
                  
                  <div class=" upload_file d-grid mx-auto">
                    <button class="btn btn-primary" type="submit">{loading ? <Spin /> : 'Upload'}</button>

                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
      {/* modal */}
      <div>
        <Modal

          title={<span style={{ color: '#5e72e4', fontFamily: 'Calibri' }}>EDIT INFORMATION</span>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={editModalSubmit}>
              Submit
            </Button>,
          ]}
        //footer={null}
        >
          <div className='edit-container'>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  First Name :
                </Col>
                <Col span={12}>
                  <Input value={editMemberData.fname} name='fname' onChange={editInputChange} placeholder="Enter first name" />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  Last Name :
                </Col>
                <Col span={12}>
                  <Input value={editMemberData.lname} name='lname' onChange={editInputChange} placeholder="Enter last name" />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  Phone:
                </Col>
                <Col span={12}>
                  <Input value={editMemberData.phone} name='lname' onChange={editInputChange} placeholder="Enter last name" />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  Address :
                </Col>
                <Col span={12}>
                  <Input value={editMemberData.address} name='lname' onChange={editInputChange} placeholder="Enter last name" />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  Aadhar No. :
                </Col>
                <Col span={12}>
                  <Input value={editMemberData.aadhar} name='lname' onChange={editInputChange} placeholder="Enter last name" />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  Pan No. :
                </Col>
                <Col span={12}>
                  <Input value={editMemberData.pan} name='lname' onChange={editInputChange} placeholder="Enter last name" />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  Gender :
                </Col>
                <Col span={12}>
                  <Select
                    name="gender"
                    value={editMemberData.gender}
                    onChange={handleGenderChange}
                    placeholder="Gender"
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Col>
              </Row>

            </div>
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                  Date of Birth :
                </Col>
                <Col span={12}>
                  <DatePicker
                    name="dob"
                    value={editMemberData.dob ? moment(editMemberData.dob) : null}
                    onChange={handleDobChange}

                  />
                </Col>
              </Row>
            </div>

          </div>

        </Modal>
      </div>
    </>
  )
}

export default UserDetails