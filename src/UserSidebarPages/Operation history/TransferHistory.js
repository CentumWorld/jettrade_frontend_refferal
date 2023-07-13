import React, { useState } from 'react'
import '../../css/TransferHistory.css'

const TransferHistory = () => {
    const [open, setOpen] = useState(false);
    const togle = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className='transfer_main_container'>
                <div className='transfer_card'>
                    <div className='transfer_heading'>
                        <p>Transfer History</p>
                    </div>
                    <div className='transfer_history_para'>
                        <p>Here you can view all your transfers and their details.</p>
                    </div>
                    <div className='transfer_select_status'>
                        <select class="form-select">
                            <option>----Select Status---</option>
                            <option>Any Status</option>
                            <option>Only Pending</option>
                            <option>Only Completed</option>
                            <option>Only Rejected</option>
                            <option>Only Cancelled</option>
                        </select>
                    </div>

                    <div className='transfer_select_timeframe'>
                        <select className="form-select">
                            <option>----Select Timeframe---</option>
                            <option>All Time</option>
                            <option>This Month</option>
                            <option>Previous Month</option>
                            <option>This Year</option>
                            <option>Previous Year</option>
                        </select>
                    </div>

                    <div className='transfer_select_account'>
                        <select class="form-select">
                            <option>----Select Account---</option>
                            <option>Any Account</option>

                        </select>
                    </div>

                    <div className='transfer_filter_button'>
                        <button className='btn btn-primary'>APPLY FILTER</button>
                    </div>

                    <div className='transfer_history_record'>
                        <div className='transfer_history_list'>Request ID</div>
                        <div className='transfer_history_list'>Status</div>
                        <div className='transfer_history_list'>Sender account</div>
                        <div className='transfer_history_list'>Recipient account</div>
                        <div className='transfer_history_list'>Amount</div>
                        <div className='transfer_history_list'>Created</div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default TransferHistory