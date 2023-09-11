import React, { useState, useEffect } from 'react'
import '../css/BankDetails.css'
import { BsPlusCircleFill } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { Button, Modal, Tabs, Input, Form, message, Spin, Table } from 'antd';
import axios from 'axios';
const { TabPane } = Tabs;


const AddBankDetails = () => {
    const [bankModal, setBankModal] = useState(false)
    const [showSpin, setShowSpin] = useState(false)
    const [bankDetails, setBankDetails] = useState([])
    const [upiDetails, setUpiDetails] = useState([])

    const openBankModal = () => {
        setBankModal(true)
    }

    useEffect(() => {
        callApiToBankDetails();
        callApiToUpiDetails();
    }, [])
    const onFinish = (values, form) => {
        console.log('Received values:', values);
        setShowSpin(true)
        let token = localStorage.getItem('token')
        let data = {
            accountHolderName: values.holder,
            accountNumber: values.account,
            bankName: values.bank,
            ifscCode: values.ifsc,
            branchName: values.branch,
            userId: localStorage.getItem('memberid')

        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.post('/member/create-member-bank-account-holder', data, config)
            .then((res) => {
                message.success(res.data.message)
                setShowSpin(false)
                setBankModal(false)
                callApiToBankDetails();
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })

    };

    const submitUPIId = (values) => {
        console.log(values.upiId)
        setShowSpin(true)

        let token = localStorage.getItem('token')
        let data = {
            upiId: values.upiId,
            userId: localStorage.getItem('memberid')
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.post('/member/create-member-upi-holder', data, config)
            .then((res) => {
                console.log(res.data)
                message.success(res.data.message)
                setBankModal(false);
                setShowSpin(false)
                callApiToUpiDetails();
            })
            .catch((err) => {
                message.warning(err.response.data.message)
            })
    }

    const bankDetailsColumn = [
        {
            title: "Account holder",
            dataIndex: "accountHolderName",
            key: "accountHolderName"
        },
        {
            title: "Bank name",
            dataIndex: "bankName",
            key: "bankName"
        },
        {
            title: "Branch name",
            dataIndex: "branchName",
            key: "branchName"
        },
        {
            title: "Account",
            dataIndex: "accountNumber",
            key: "accountNumber"
        },
        {
            title: "IFSC Code",
            dataIndex: "ifscCode",
            key: "ifscCode"
        },

    ]
    const upiColumn = [
        {
            title: "UPI Id",
            dataIndex: "userId",
            key:"userId"
        },
        {
            title: "UPI Id",
            dataIndex: "upiId",
            key:"upiId"
        },
    ]
    const callApiToBankDetails = () => {
        let token = localStorage.getItem('token')
        let data = {
            userId: localStorage.getItem('memberid')
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.post('/member/get-member-own-bank-details', data, config)
            .then((res) => {
                console.log(res.data)
                setBankDetails(res.data.memberBankDetails)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }
    const callApiToUpiDetails = () => {
        let token = localStorage.getItem('token')
        let data = {
            userId: localStorage.getItem('memberid')
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.post('/member/get-member-own-upi', data, config)
            .then((res) => {
                setUpiDetails(res.data.memberUpiId)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    return (
        <>
            <div className='bank-header'>
                <p>Bank details & UPI ID</p>
                <Button type='primary' onClick={openBankModal}><BsPlusCircleFill />&nbsp; Add Bank</Button>
            </div>


            <Modal
                title="Bank details & UPI Id"
                open={bankModal}
                onCancel={() => setBankModal(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Bank" key="1">
                        <Form name="basic" onFinish={(values) => onFinish(values)}>
                            <Form.Item
                                label="Holder name"
                                name="holder"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input holder name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Bank holder name' />
                            </Form.Item>

                            <Form.Item
                                label="Bank name"
                                name="bank"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input bank name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Bank name' />
                            </Form.Item>

                            <Form.Item
                                label="Brnch name"
                                name="branch"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input branch name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Branch name' />
                            </Form.Item>

                            <Form.Item
                                label="Account no"
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input account no!',
                                    },
                                ]}
                            >
                                <Input type='number' placeholder='Account no' />
                            </Form.Item>

                            <Form.Item
                                label="IFSC no"
                                name="ifsc"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input ifsc no!',
                                    },
                                ]}
                            >
                                <Input placeholder='IFSC no' />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                                    {showSpin ? <Spin /> : 'Submit'}
                                </Button>
                            </Form.Item>
                        </Form>

                    </TabPane>
                    <TabPane tab="UPI ID" key="2">
                        <Form name="basic" onFinish={submitUPIId}>
                            <Form.Item
                                label="UPI ID"
                                name="upiId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your UPI ID!',
                                    },
                                ]}
                            >
                                <Input placeholder='Enter UPI ID' />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                                    {showSpin ? <Spin /> : 'Submit'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Bank" key="1">
                    <Table columns={bankDetailsColumn} dataSource={bankDetails} />
                </TabPane>
                <TabPane tab="UPI ID" key="2">
                    <Table columns={upiColumn} dataSource={upiDetails} />
                </TabPane>
            </Tabs>
        </>
    );
};

export default AddBankDetails