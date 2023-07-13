import React, { useState } from 'react'
import '../../css/RealAccount.css';
import {FaAngleDown} from 'react-icons/fa'


function RealAccount() {
    const [accountType, setAccountType] = useState(true);
    const [metaFive, setMetaFive] = useState(false);
    const [metaFour, setMetaFour] = useState(false);
    const [jetTrade, setJetTrade] = useState(false);
    
    const account_function_real = () =>{
        setAccountType(true);
    }
    const account_function_demo = () =>{
        setAccountType(false);
    }
    const metatradefive = () =>{
        setMetaFive(!metaFive);
    }
    const metatradefour = () =>{
        setMetaFour(!metaFour);
    }
    const jettradefunction = () =>{
        setJetTrade(!jetTrade)
    }

  return (
    <>
        <div className='real_account'>
            <div className='real_account_card'>
                <div className='account_details_heading'>
                    <p>Set up account details</p>
                </div>
                <div className='account_type_para'>
                    <p>Account type</p>
                </div>
                <div className='account_type'>
                    <div className='account_type_btn_real'>
                        <button type='button' className='btn btn-outline-primary' onClick={account_function_real}>Real</button>
                    </div>
                    <div className='account_type_btn_demo'>
                        <button type='button' className='btn btn-outline-secondary' onClick={account_function_demo}>Demo</button>
                    </div>
                </div>
                <div className='account_plateform'>
                    <p>Platform</p>
                </div>
                <div className='accont_three_div'>
                    <div className='metatrade_five'>
                        <div className='metatrade_five_heading'>
                            <p>MetaTreader <strong style={{'color':'orange'}}>5</strong></p>
                        </div>
                        <div className='meta_trade_content'>
                            <p>Spread from..................0.6 pips <br /><small>Floating spread markup</small></p>
                            <p>Min Deposite..................$25 <br /><small>Favourable:$100</small></p>
                            <p>Instruments <br /><small>230 instruments</small></p>
                        </div>
                    </div>
                    <div className='metatrade_four'>
                        <div className='metatrade_five_heading'>
                            <p>MetaTreader <strong style={{'color':'orange'}}>4</strong></p>
                        </div>
                        <div className='meta_trade_content'>
                            <p>Spread from..................0.6 pips <br /><small>Floating spread markup</small></p>
                            <p>Min Deposite..................$25 <br /><small>Favourable:$100</small></p>
                            <p>Instruments <br /><small>74 instruments</small></p>
                        </div>
                    </div>
                    <div className='metatrade_jet'>
                        <div className='metatrade_jet_heading'>
                            <p>JettradeFX</p>
                        </div>
                        <div className='meta_trade_content'>
                            <p>Trade in a new way <br /><small>Access the world's financial markets with our brand-new trading platform</small></p>
                            <p>Inhance your experience <br /><small>Enjoy all trading tools and analytics in one place</small></p>
                        </div>
                    </div>
                   
                </div>
                <div className='three_div_small'>
                    <div className='three_div_small_select_metatrade_five'>
                        <p>MetaTreader <strong style={{'color':'orange'}}>5</strong></p>
                        <span onClick={metatradefive}><FaAngleDown/></span>
                    </div>
                    {metaFive?  
                        <div className='metatrade_five_div'>
                            <div className='meta_trade_content_small'>
                                <p>Spread from..................0.6 pips <br /><small>Floating spread markup</small></p>
                                <p>Min Deposite..................$25 <br /><small>Favourable:$100</small></p>
                                <p>Instruments <br /><small>230 instruments</small></p>
                            </div>
                        </div>:''
                    } <br />
                    <div className='three_div_small_select_metatrade_five'>
                        <p>MetaTreader <strong style={{'color':'orange'}}>4</strong></p>
                        <span onClick={metatradefour}><FaAngleDown/></span>
                    </div>
                    {metaFour?
                        <div className='meta_trade_content_small'>
                            <p>Spread from..................0.6 pips <br /><small>Floating spread markup</small></p>
                            <p>Min Deposite..................$25 <br /><small>Favourable:$100</small></p>
                            <p>Instruments <br /><small>74 instruments</small></p>
                        </div>:
                        ""
                    } <br />
                    <div className='three_div_small_select_metatrade_five'>
                        <p>JETTRADE FX</p>
                        <span onClick={jettradefunction}><FaAngleDown/></span>
                    </div>
                    {jetTrade? 
                        <div className='meta_trade_content_small'>
                            <p>Trade in a new way <br /><small>Access the world's financial markets with our brand-new trading platform</small></p>
                            <p>Inhance your experience <br /><small>Enjoy all trading tools and analytics in one place</small></p>
                        </div>:""

                    }

                </div>
                <div className='leverage'>
                        <div className='leverage_heading'>
                            <p>Leverage</p>
                        </div>
                        <div className='leverage_select_option'>
                            <select  className="form-select">
                                <option value="">1:500</option>
                                <option value="">1:200</option>
                                <option value="">1:100</option>
                                <option value="">1:50</option>
                                <option value="">1:30</option>
                                <option value="">1:25</option>
                                <option value="">1:15</option>
                                <option value="">1:5</option>
                                <option value="">1:1</option>
                            </select>
                        </div>
                </div>
                <hr />
                <div className='leverage_btn'>
                    <button type='button' className='btn btn-primary'>CREATE ACCOUNT</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default RealAccount