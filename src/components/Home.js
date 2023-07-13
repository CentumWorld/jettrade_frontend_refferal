import React from 'react'
import '../css/Home.css'
import { NavLink } from 'react-router-dom';
import ForexTricker from './ForexTricker';


function Home() {
    return (
        <>
            <div className='home_container'>

                <div className='home_heading1'>
                    {/* <MoveStuffAround/> */}
                    <div className='forex-ticker d-block'>

                        <p>ETHUSDT see forex chart <NavLink to={'/chart'} target="_blank">View</NavLink></p>
                        {/* <marquee behavior="" direction=""><img src={forexChart} alt="" width={300} height={40}/></marquee> */}
                        <marquee behavior="" direction=""><ForexTricker /></marquee>
                        
                    </div>

                    WELCOME TO
                    <p>JETTRADE FX</p>
                    <div className='jettrade'>
                        <p>ADVANCE & SMART FOREX TRADING PLATFORM</p>
                    </div>
                    <div className='home-footer'>
                        <p>PARTNER WITH CENTUM WORLD</p>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Home