import React from 'react'
import '../css/InternalTransfer.css'
import PinInput from 'react-pin-input';
import { NavLink } from 'react-router-dom';

const InternalTransfer = () => {
  return (
    <>
      <div className='user_internal_transfer_main_container'>
        <div className='user_internal_transfer_card'>
          <div className='user_internal_transfer_heading'>
            <p>Internal transfer</p>
          </div>
          <div className='user_internal_transfer_para'>
            <p>You are about to request an internal transfer from one of your accounts to the other. Please note that you can transfer funds between your own accounts only. If you transfer funds to the account in a different currency, we will convert these funds to the current market quote. Please enter the transfer amount and select the destination account. Then enter your JETTRADE FX PIN and submit the request. Internal transfers usually take 1–2 hours to be processed.</p>
          </div>
          <div className='internal_transfer_from_to'>
            <div className='row'>
              <div className='internal_transfer_from col-sm'>
                <p>From</p>
                <select class="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div className=' internal_transfer_to col-sm'>
                <p>To</p>
                <select class="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
          </div>
          <div className='user_internal_transfer_amount_card'>
            <div className='user_internal_transfer_amount'>
              <div className='transfer_amount_heading'>
                <h2>Amount</h2>
              </div>
              <div className='internal_transfer_amount_from'>
                <label htmlFor="amount" class="form-label">Amount From</label>
                <input type="text" class="form-control" id="amount" />
              </div>
              <div className='internal_transfer_pin_area col-sm'>
                <div className='internal_transfer_pin_part col-sm'>
                  <div className='internal_transfer_pin'>
                    <label htmlFor="jettrade_pin" class="form-label">JETTRADE FX PIN</label>
                    <PinInput
                      length={4}
                      initialValue=""
                      secret
                      onChange={(value, index) => { }}
                      type="numeric"
                      inputMode="number"
                      style={{ padding: '10px' }}
                      inputStyle={{ borderColor: 'red', width: '20px', height: '20px' }}
                      inputFocusStyle={{ borderColor: 'blue' }}
                      onComplete={(value, index) => { }}
                      autoSelect={true}
                      regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                    />
                  </div>
                  <div className='forget_internal_transfer_pin'>
                    <NavLink to="/userdashboard/setting/resetpassword">Forget your jettrade fx pin</NavLink>
                  </div>
                </div>
                <div className='internal_transfer_request_part col-sm'>
                  <div className='internal_transfer_request'>
                    <button className='btn btn-secondary'>Request</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InternalTransfer