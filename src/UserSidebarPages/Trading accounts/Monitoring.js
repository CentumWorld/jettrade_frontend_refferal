import React from 'react'
import '../../css/Monitoring.css'

const Monitoring = () => {
    return (
        <>
            <div className='monitoring_main_container'>
                <div className='monitoring_card'>
                    <div className='monitoring_heading'>
                        <p>JETTRADE FX real Forex accounts monitoring system</p>
                    </div>
                    <div className='monitoring_para'>
                        <p>This is a list of already monitored accounts and those available for monitoring. Here you can also manage the monitoring.</p>
                    </div>
                    <div className='monitoring_available_account'>
                        <p>Your available accounts</p>
                    </div>
                    <div className='monitoring_available_account_field'>
                        <span>Account</span>
                        <span>Server</span>
                        <span>Type</span>
                    </div>
                    <hr />
                    <div className='monitoring_available_account_field_data'>
                        <span>No record found</span>
                    </div>

                    <div className='monitoring_monitored_account'>
                        <p>Your monitored accounts</p>
                    </div>
                    <div className='monitoring_monitored_account_field'>
                        <span>Account</span>
                        <span>Server</span>
                        <span>Type</span>
                    </div>
                    <hr />
                    <div className='monitorined_account_data'>
                        <span>No record</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Monitoring