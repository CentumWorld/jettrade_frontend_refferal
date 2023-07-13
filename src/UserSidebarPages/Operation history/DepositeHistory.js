import React, { useState } from 'react'
import '../../css/DepositeHistory.css'


const DepositeHistory = () => {

    const [open, setOpen] = useState(false);
    const togle = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className='deposite_main_container'>
                <div className='deposite_card'>
                    <div className='deposite_heading'>
                        <p>Deposite History</p>
                    </div>
                    <div className='depo_history_para'>
                        <p>Here you can view the details of all your deposits or cancel requests with a pending status. If you want to make a new deposit, navigate to the Deposit page.</p>
                    </div>
                    <div className='select_status'>
                        <select class="form-select">
                            <option>----Select Status---</option>
                            <option>Any Status</option>
                            <option>Only Pending</option>
                            <option>Only Completed</option>
                            <option>Only Rejected</option>
                            <option>Only Cancelled</option>
                        </select>
                    </div>

                    <div className='select_timeframe'>
                        <select className="form-select">
                            <option>----Select Timeframe---</option>
                            <option>All Time</option>
                            <option>This Month</option>
                            <option>Previous Month</option>
                            <option>This Year</option>
                            <option>Previous Year</option>
                        </select>
                    </div>

                    <div className='select_account'>
                        <select class="form-select">
                            <option>----Select Account---</option>
                            <option>Any Account</option>

                        </select>
                    </div>

                    <div className='deposite_filter_button'>
                        <button className='btn btn-primary'>APPLY FILTER</button>
                    </div>

                    <div className='deposite_history_record'>
                        <div className='history_list'>Request ID</div>
                        <div className='history_list'>Status</div>
                        <div className='history_list'>Account</div>
                        <div className='history_list'>Amount</div>
                        <div className='history_list'>Details</div>
                        <div className='history_list'>Created</div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default DepositeHistory