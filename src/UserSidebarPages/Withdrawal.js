import React,{useState} from 'react'
import '../css/Withdrawal.css'
import btc from '../img/Deposit account coin type/btc.png'
import doge from '../img/Deposit account coin type/doge.svg'
import binpay from '../img/Deposit account coin type/binpay.svg'
import lite from '../img/Deposit account coin type/litecoin.svg'
import nt from '../img/Deposit account coin type/nt.png'
import skrill from '../img/Deposit account coin type/skrill.png'
import usdte from '../img/Deposit account coin type/usdte.svg'
import usdtt from '../img/Deposit account coin type/usdtt.svg'

const Withdrawal = () => {

//     const [changeDivState, setChangeDivState] = useState('');
//     const changeDiv = (data) => {
//     setChangeDivState(data);
//   }
    return (
        <>
            <div className='withdraw_container'>
                <div className='withdraw_card'>
                    <div className='withdraw_heading'>
                        <h5>Payment methods</h5>
                    </div>

                    <div className='withdraw_account_type '>
                        {/* <div className='deposite_coin_account_one row'> */}
                        <div className='withdraw_coin_card'>
                            <span><img src={btc} alt="" width='200px' height='60px' /></span>
                        </div>
                        <div className='withdraw_coin_card'>
                            <span><img src={doge} alt="" width='80px' height='40px' /></span>
                            <span className='ms'>Dogecoin</span>
                        </div>
                        <div className='withdraw_coin_card'>
                            <span><img src={binpay} alt="" width='100px' height='40px' /></span>
                            <span className='ms'> Ethereum(ERC20)</span>
                        </div>
                        {/* </div> */}

                        {/* <div className='deposite_coin_account_two row'> */}
                        <div className='withdraw_coin_card'>
                            <div className='lite-coin'>
                                <span><img src={lite} alt="" width='80px' height='40px' /></span>
                                <span>Litecoin</span>
                            </div>
                        </div>
                        <div className='withdraw_coin_card'>
                            <span><img src={nt} alt="" width='180px' height='60px' /></span>
                        </div>
                        <div className='withdraw_coin_card'>
                            <span><img src={skrill} alt="" width='180px' height='50px' /></span>
                        </div>
                        {/* </div> */}
                        {/* <div className='deposit_coin_account_three  row'> */}
                        <div className='withdraw_coin_card'>
                            <span><img src={usdte} alt="" width='80px' height='40px' /></span>
                            <span>Tether (ERC20)</span>
                        </div>
                        <div className='withdraw_coin_card'>
                            <span><img src={usdtt} alt="" width='80px' height='40px' /></span>
                            <span>Tether (TRC20)</span>
                        </div>
                        {/* </div> */}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Withdrawal