import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Radio, Select, Tabs } from 'antd';
import '../css/NewDeposit.css'
import btc from '../img/Deposit account coin type/btc.png'
import doge from '../img/Deposit account coin type/doge.svg'
import binpay from '../img/Deposit account coin type/binpay.svg'
import lite from '../img/Deposit account coin type/litecoin.svg'
import nt from '../img/Deposit account coin type/nt.png'
import skrill from '../img/Deposit account coin type/skrill.png'
import usdte from '../img/Deposit account coin type/usdte.svg'
import usdtt from '../img/Deposit account coin type/usdtt.svg'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import { AiOutlineDown } from 'react-icons/ai'
import bonus1 from '../img/Deposit account coin type/bonus-advantage-01.jpg'
import bonus2 from '../img/Deposit account coin type/bonus-advantage-02.jpg'
import bonus3 from '../img/Deposit account coin type/bonus-advantage-03.jpg'
import bonus4 from '../img/Deposit account coin type/bonus-advantage-04.jpg'
import { CgDanger } from 'react-icons/cg'
import eth_currency from '../img/Deposit account coin type/ETH-currency.svg'

function NewDeposite() {
  const accounts = ['1','2','3']
  const [bonusArea, setBonusArea] = useState(false);
  const [changeDivState, setChangeDivState] = useState('');
  const [amount, setAmount] = useState('');
  const [eathValue, setEathValue] = useState('');
  const [ethereumType, setEthereum] = useState('');
  const bonusareacard = () => {
    setBonusArea(!bonusArea);
  }
  const changeDiv = (data) => {
    setChangeDivState(data);
  }
  const amountFunction = (e) => {
    e.preventDefault();
    let onetEthValue = 2439.02;
    // setEathValue(e.target.value * onetEthValue);

    setEathValue((Math.round(e.target.value * onetEthValue * 100) / 100).toFixed(2));
    setAmount(e.target.value);
    // console.log(e.target.value,'34');
  }
  const handleChange = (event) => {
    setEthereum(event.target.value);
    setAmount('');
  }
  const resetRadioButton = () => {
    setEthereum('');
  }

  const [mode, setMode] = useState('top');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <>

      <div className='new-deposit_container'>
        <div className='new-deposit_card'>
          <div className='new-deposit_heading'>
            <h2>Select where to transfer the money</h2>
          </div>
          <div className='where_to_money_transfer row'>
            <span className='col-md-6'>
              {/* <Form.Select  >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select> */}
             <Select className='where_to_money_transfer_select'
              placeholder='Select account'>
                {accounts.map((account,index)=>{
                  return <Select.Option key={index} value={account}>{account}</Select.Option>
                })}
             </Select>
            </span>
          </div>
          <div className='new_deposit_for_account'>
            <h2>New deposit for account {1654875}</h2>
          </div>
          <div className='deposite_coin_account_type '>
            {/* <div className='deposite_coin_account_one row'> */}
            <div className='deposite_coin_card' onClick={() => changeDiv('btc')}>
              <span><img src={btc} alt="" width='200px' height='60px' /></span>
            </div>
            <div className='deposite_coin_card' onClick={() => changeDiv('doge')}>
              <span><img src={doge} alt="" width='80px' height='40px' /></span>
              <span className='ms'>Dogecoin</span>
            </div>
            <div className='deposite_coin_card' onClick={() => changeDiv('ethereum')}>
              <span><img src={binpay} alt="" width='100px' height='40px' /></span>
              <span className='ms'> Ethereum(ERC20)</span>
            </div>
            {/* </div> */}

            {/* <div className='deposite_coin_account_two row'> */}
            <div className='deposite_coin_card' onClick={() => changeDiv('litecoin')}>
              <div className='lite-coin'>
                <span><img src={lite} alt="" width='80px' height='40px' /></span>
                <span>Litecoin</span>
              </div>
            </div>
            <div className='deposite_coin_card' onClick={() => changeDiv('nt')}>
              <span><img src={nt} alt="" width='180px' height='60px' /></span>
            </div>
            <div className='deposite_coin_card' onClick={() => changeDiv('skrill')}>
              <span><img src={skrill} alt="" width='180px' height='50px' /></span>
            </div>
            {/* </div> */}
            {/* <div className='deposit_coin_account_three  row'> */}
            <div className='deposite_coin_card' onClick={() => changeDiv('usdte')}>
              <span><img src={usdte} alt="" width='80px' height='40px' /></span>
              <span>Tether (ERC20)</span>
            </div>
            <div className='deposite_coin_card' onClick={() => changeDiv('usdtt')}>
              <span><img src={usdtt} alt="" width='80px' height='40px' /></span>
              <span>Tether (TRC20)</span>
            </div>
            {/* </div> */}
          </div>
          <div className='deposit_commission_area'>
            <ul>
              <li><span><MdOutlineVerifiedUser /></span> <small>NO COMMISSION</small></li>
              <li><span><MdOutlineVerifiedUser /> </span><small> BEST EXCHANGE RATES</small></li>
              <li><span><MdOutlineVerifiedUser /></span> <small>50% DEPOSIT BONUS</small></li>
            </ul>
          </div>
          <div className='choose_bonus'>
            <div className='choose_bonus_heading'>
              <h2>Choose bonus</h2>
            </div>
            <div className={bonusArea ? 'choose_bonus_area_large' : 'choose_bonus_area'}>
              <div className='bonus_point_area' onClick={bonusareacard}>
                <span><h3>What advantages does the bonus bring?</h3></span>
                <span style={{ fontSize: '22px' }}><AiOutlineDown /></span>
              </div>
              {bonusArea ?
                <div className='bonus_advantage'>
                  <ul>
                    <li> <img src={bonus1} height='40px' alt="" /> Provides higher trading volume</li>
                    <li> <img src={bonus2} height='40px' alt="" /> Does not block withdrawals</li>
                    <li> <img src={bonus3} height='40px' alt="" /> Can be converted to your money in full by trading <br /> <small>No time limits on completing the bonus</small></li>
                    <li> <img src={bonus4} height='40px' alt="" /> Can be cancelled at your will at any moment</li>
                  </ul>
                </div>
                : ''}

            </div>
            <div className='bonus_continue_button '>
              <button className='btn btn-primary'>CONTINUE</button>
            </div>


          </div>
        </div>
      </div>
      <div className='proceed-to-deposit-main-container'>
        <div className='proceed-to-deposit'>
          {changeDivState === 'btc' ?
            <div className='bit-coin-card'>
              <h4>Proceed to deposit via Bitcoin (BTC)?</h4>
              <h6>Important to know</h6>
              <div className='bit-coin-para'>
                <span><CgDanger /></span>
                <p> <strong>We only accept Bitcoin (BTC)</strong>  Bitcoin (BTC) is a stand-alone payment instrument and is not associated with Bitcoin Cash or any other cryptocurrency fork.</p>

              </div>
              <div className='bit-coin-para-two'>
                <span><CgDanger /></span>
                <p>The total of all your Bitcoin deposits cannot exceed $20,000.00 a day.</p>
              </div>
              <hr />
              <div className='proceed_with_bitcoin_button'>
                <button className='choose_another_method_btc btn btn-secondary'>CHOOSE ANOTHER METHOD</button>
                <button className='proceed_with_bitcoin btn btn-primary'>PROCEED WITH BTC</button>

              </div>

            </div> : ''

          }
          {changeDivState === 'doge' ?
            <div className='bit-coin-card'>
              <h4>Proceed to depositing via Dogecoin (DOGE)?</h4>
              <h6>Important to know</h6>
              <div className='bit-coin-para'>
                <span><CgDanger /></span>
                <p> <strong>The minimum deposit amount is 230 Ð.</strong>  All deposits below the limit will be lost.</p>

              </div>
              <div className='bit-coin-para-two'>
                <span><CgDanger /></span>
                <p>Carefully check the address. <strong>The transaction will be lost if the address is incorrect.</strong></p>
              </div>
              <hr />
              <div className='proceed_with_bitcoin_button'>
                <button className='choose_another_method_btc btn btn-secondary'>CHOOSE ANOTHER METHOD</button>
                <button className='proceed_with_bitcoin btn btn-primary'>PROCEED WITH DOGE</button>

              </div>
            </div> : ''

          }

          {changeDivState === 'ethereum' ?
            <div className='ethereum-coin-card'>
              <h4>Specify the deposit amount</h4>
              <small>currency</small>
              <div className='ethereum_coin_currency'>
                <span><img src={eth_currency} height='20px' alt="" /></span>
                <span>ETH</span>
              </div>
              <div className='select-ready-made-opton-heading'>
                <h5> Select a ready-made option</h5>
              </div>
              <div className='select-ready-made-opton'>
                <div className='ready-made-option-one'>
                  <div className='ready-made-first-radio'>
                    <input type="radio" name='ethereum' value="ETH5" checked={ethereumType === 'ETH5'} onChange={handleChange} style={{ "height": '20px', "width": '20px' }} />
                  </div>
                  <span>ETH 5</span>
                  <small>Fixed $ 12,195.12</small>
                </div>
                <div className='ready-made-option-one'>
                  <div className='ready-made-first-radio'>
                    <input type="radio" name='ethereum' value="ETH1" checked={ethereumType === 'ETH1'} onChange={handleChange} style={{ "height": '20px', "width": '20px' }} />
                  </div>
                  <span>ETH 1</span>
                  <small>Fixed $ 2,439.02</small>
                </div>
                <div className='ready-made-option-one'>
                  <div className='ready-made-first-radio'>
                    <input type="radio" name='ethereum' value="ETH0.5" checked={ethereumType === 'ETH0.5'} onChange={handleChange} style={{ "height": '20px', "width": '20px' }} />
                  </div>
                  <span>ETH 0.5</span>
                  <small>Fixed $ 1,219.51</small>
                </div>
              </div>
              <div className='enter-manually-heading'>
                <h5>  Or enter the amount manually</h5>
              </div>
              <div className='amount-heading'>Amount</div>
              <div className='enter-manually-amount' onClick={resetRadioButton}>
                <input type="text" id='amount' name="amount" value={amount} onChange={amountFunction} maxLength={2} placeholder='Minimum ETH 0.02' />
                {amount ? <span>Fixed $ {eathValue}</span> : ''}
              </div>
              <div className='amount-footer'>ETH 1.00 = Fixed $ 2,439.02</div>
              <hr />
              <div className='ethereum-continue-btn'>
                <button className='btn btn-primary'>CONTINUE</button>
              </div>


            </div> : ''


          }

          {changeDivState === 'litecoin' ?
            <div className='bit-coin-card'>
              <h4>Proceed to depositing via Litecoin (LTC)?</h4>
              <h6>Important to know</h6>
              <div className='bit-coin-para'>
                <span><CgDanger /></span>
                <p> <strong>The minimum deposit amount is 0.3 Ł</strong>  All deposits below the limit will be lost.</p>

              </div>
              <div className='bit-coin-para-two'>
                <span><CgDanger /></span>
                <p>Carefully check the address. <strong>The transaction will be lost if the address is incorrect.</strong></p>
              </div>
              <hr />
              <div className='proceed_with_bitcoin_button'>
                <button className='choose_another_method_btc btn btn-secondary'>CHOOSE ANOTHER METHOD</button>
                <button className='proceed_with_bitcoin btn btn-primary'>PROCEED WITH LTC</button>

              </div>
            </div> : ''

          }

          {changeDivState === 'nt' ?
            <div className='bit-coin-card'>
              <h4>Specify the deposit amount</h4>
              <div className='specify-the-deposit'>
                <div className='iwant-to-deposit'>
                  <small>I want to deposit in:</small>

                  <div>
                    <Radio.Group
                      onChange={handleModeChange}
                      value={mode}
                      style={{
                        marginBottom: 8,
                      }}
                    >
                      <Radio.Button value="top">Horizontal</Radio.Button>
                      <Radio.Button value="left">Vertical</Radio.Button>
                    </Radio.Group>
                    <Tabs
                      defaultActiveKey="1"
                      tabPosition={mode}
                      style={{
                        height: 220,
                      }}
                    // items={new Array(30).fill(null).map((_, i) => {
                    //   const id = String(i);
                    //   return {
                    //     label: `Tab-${id}`,
                    //     key: id,
                    //     disabled: i === 28,
                    //     children: `Content of tab ${id}`,
                    //   };
                    // })}
                    />
                  </div>
                </div>
              </div>



            </div> : ''

          }

          {changeDivState === 'usdte' ?
            <div className='bit-coin-card'>
              <h4>Proceed to depositing via Tether (ERC20)?</h4>
              <h6>Important to know</h6>
              <div className='bit-coin-para'>
                <span><CgDanger /></span>
                <p> <strong>The minimum deposit amount is 50 ₮.</strong>  All deposits below the limit will be lost.</p>

              </div>
              <div className='bit-coin-para-two'>
                <span><CgDanger /></span>
                <p>Carefully check the address. <strong> The transaction will be lost if the address is incorrect.</strong></p>
              </div>
              <hr />
              <div className='proceed_with_bitcoin_button'>
                <button className='choose_another_method_btc btn btn-secondary'>CHOOSE ANOTHER METHOD</button>
                <button className='proceed_with_bitcoin btn btn-primary'>PROCEED WITH TETHER ERC20</button>

              </div>
            </div> : ''

          }

          {changeDivState === 'usdtt' ?
            <div className='bit-coin-card'>
              <h4>Proceed to depositing via Tether (TRC20)?</h4>
              <h6>Important to know</h6>
              <div className='bit-coin-para'>
                <span><CgDanger /></span>
                <p> <strong>The minimum deposit amount is 50 ₮.</strong>  All deposits below the limit will be lost.</p>

              </div>
              <div className='bit-coin-para-two'>
                <span><CgDanger /></span>
                <p>Carefully check the address. <strong> The transaction will be lost if the address is incorrect.</strong></p>
              </div>
              <hr />
              <div className='proceed_with_bitcoin_button'>
                <button className='choose_another_method_btc btn btn-secondary'>CHOOSE ANOTHER METHOD</button>
                <button className='proceed_with_bitcoin btn btn-primary'>PROCEED WITH TETHER TRC20</button>

              </div>
            </div> : ''

          }


        </div>
      </div>
    </>
  )
}

export default NewDeposite