import React,{useState} from 'react'
import '../../css/WithdrawalHistory.css'


const WithdrawalHistory = () => {
  const [open, setOpen] = useState(false);
  const togle = () => {
    setOpen(!open)
  }
  return (
    <>
      <div className='withdrawal_main_container'>
        <div className='withdrawal_card'>
          <div className='withdrawal_heading'>
            <p>Withdrawal History</p>
          </div>
          <div className='withdrawal_history_para'>
            <p>Here you can view all your withdrawal requests and their details.</p>
          </div>
          <div className='withdrawal_select_status'>
            <select class="form-select">
              <option>----Select Status---</option>
              <option>Any Status</option>
              <option>Only Pending</option>
              <option>Only Completed</option>
              <option>Only Rejected</option>
              <option>Only Cancelled</option>
            </select>
          </div>

          <div className='withdrawal_select_timeframe'>
            <select className="form-select">
              <option>----Select Timeframe---</option>
              <option>All Time</option>
              <option>This Month</option>
              <option>Previous Month</option>
              <option>This Year</option>
              <option>Previous Year</option>
            </select>
          </div>

          <div className='withdrawal_select_account'>
            <select class="form-select">
              <option>----Select Account---</option>
              <option>Any Account</option>

            </select>
          </div>

          <div className='withdrawal_filter_button'>
            <button className='btn btn-primary'>APPLY FILTER</button>
          </div>

          <div className='withdrawal_history_record'>
            <div className='Withdrawal_history_list'>Request ID</div>
            <div className='Withdrawal_history_list'>Status</div>
            <div className='Withdrawal_history_list'>Account</div>
            <div className='Withdrawal_history_list'>Amount</div>
            <div className='Withdrawal_history_list'>Details</div>
            <div className='Withdrawal_history_list'>Created</div>
          </div>
          <hr />
        </div>
      </div>
    </>
  )
}

export default WithdrawalHistory