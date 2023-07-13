import React, { useState } from 'react'
import '../css/UserHomePage.css'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { Switch } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'


const UserHomePage = () => {
  const [toggle, setToggle] = useState(false);
  const togglefunction = () => {
    setToggle(!toggle);
  }
  return (
    <>
      <div className='user-dashboard-home'>
        <div className='user-dashboard-home-card'>
          <div className='user-dashboard-home-card-heading'>
            <p>Primary account <span><AiOutlineQuestionCircle /></span> </p>
          </div>
          <div className='user_dashboard_account'>
            <select class="form-select">
              <option>----Select Status---</option>
              <option>Any Status</option>
              <option>Only Pending</option>
            </select>
          </div>

          <div className='row user_dashboard_overview_current_funds_maindiv'>
            <div className='over-view col-lg-4'>
              <div className='over-view-heading'>
                <p>Overview</p>
              </div>
              <div className='over-server'>
                <p>Server</p>
                <span>Jettrade FX</span>
              </div>
              <hr />
              <div className='over-leverage'>
                <p>Leverage &nbsp;<span><AiOutlineQuestionCircle /></span></p>
                <span><NavLink to={''}>1:500</NavLink></span>
              </div>
              <hr />
              <div className='over-noswap'>
                <p>No Swap &nbsp;<span><AiOutlineQuestionCircle /></span></p>
                <span>Yes</span>
              </div>
              <hr />
              <div className='over-on-off'>
                <p>Fixed rate &nbsp;<span><AiOutlineQuestionCircle /></span></p>
                <span>{toggle ? 'On' : 'Off'}&nbsp;<Switch onClick={togglefunction} /></span>
              </div>
              <hr />
            </div>
            <div className='current-fund col-lg-8'>
              <div className='current-fund-heading'>
                <p>Current funds</p>
              </div>
              <div className='current-fund-content'>
                <div className='free-margin'>
                  <p>Free Marging&nbsp;<span><AiOutlineQuestionCircle /></span> </p>
                  <h5>$0.00</h5>
                </div>
                <div className='equity'>
                  <p>Equity&nbsp;<span><AiOutlineQuestionCircle /></span> </p>
                  <h5>$0.00</h5>
                </div>
                <div className='user-home-balance'>
                  <p>Balance&nbsp;<span><AiOutlineQuestionCircle /></span> </p>
                  <h5>$0.00</h5>
                </div>
              </div>
              <div className='current-fund-btn'>
                <div className='new-deposite'>
                  <button type='button' className='btn btn-secondary'>NEW DEPOSIT</button>
                </div>
                <div className='trade'>
                  <button type='button' className='btn btn-primary'>TRADE</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* -------------Second Card--------------- */}

      <div className='user_dashboard_bonus'>
        <div className='user_dashboard_bonus_card'>
          <div className='user_dashboard_bonus_heading'>
            <h2>50% Bonuses <span><AiOutlineQuestionCircle style={{ cursor: 'pointer' }} /></span></h2>
          </div>
          <div className=' row user_dashboard_bonus_area '>
            <div className='user_dashboard_bonus_para col-8'>
              <p>Here you'll find information about all your active and available bonuses. You can claim a bonus on each deposit.</p>
            </div>
            <div className='user_dashboard_bonus_button col-4'>
              <button className='btn btn-primary'>GET BONUS</button>
            </div>
          </div>
          <div className='user_dashboard_bonus_link'>
            <NavLink to='/'>LEARN MORE ABOUT DEPOSIT BONUSES</NavLink>
          </div>
        </div>
      </div>

    {/* ----------------third card------------------ */}

    <div className='user_dashboard_your_account_container'>
      <div className='user_dashboard_your_account_card'>
        <div className='user_dashboard_your_account_heading'>
          <h2>Your Account</h2><span><NavLink to='/'>CREATE ACCOUNT</NavLink></span>
        </div>
        <div className='table create-account-table table-responsive'>
          <thead>
            <tr>
              <th>Account</th>
              <th>Type</th>
              <th>Server</th>
              <th>Balance</th>
              <th>Equity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='d-flex'><strong>MT</strong>&nbsp;<small>5</small> &nbsp;<span className='three-dot'><BsThreeDotsVertical/></span>&nbsp; <span>789565</span></td>
              <td>
                <div className='type-rate'>
                  <span>Real</span>
                </div>
              </td>
              <td>JettradeFXReal</td>
              <td>$0.00</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td className='d-flex'><strong>MT</strong>&nbsp;<small>5</small> &nbsp;<span className='three-dot'><BsThreeDotsVertical/></span>&nbsp; <span>789565</span></td>
              <td>
                <div className='type-rate'>
                  <span>Real</span>
                </div>
              </td>
              <td>JettradeFXReal</td>
              <td>$0.00</td>
              <td>$0.00</td>
            </tr>
          </tbody>
        </div>

      </div>
    </div>

    </>
  )
}

export default UserHomePage