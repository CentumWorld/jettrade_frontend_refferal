import React, { useState } from 'react'
import '../../css/ManageBonuses.css'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const ManageBonuses = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className='bonuses_main_container'>
                <div className='bonuses_card'>
                    <div className='bonuses_heading'>
                        <p>Your deposit bonuses</p>
                    </div>
                    <div className='bonuses_para'>
                        <p>Our goal is to make your trading experience convenient and outstanding. Deposit your account, and we will add from 10% to 50% to its amount for free. It is a perfect way to increase your account's total funds.</p>
                    </div>
                    <div className='bonuses_tab'>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab style={{ 'fontWeight': '800', 'fontSize': '16px' }} label="AVAILABLE DEPOSITE BONUSES" value="1" />
                                        <Tab style={{ 'fontWeight': '800', 'fontSize': '16px' }} label="ACTIVE AND CANCLED BONUSES" value="2" />

                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <div className='deposit_bonuses'>
                                        <div className='deposit_bonus_data'>
                                            <p>This is a list of all your available deposit bonuses. Click Get bonus to claim one.</p>
                                        </div>
                                        <div className='deposite_bonuses_tab'>
                                            <div className='deposite_bonuses_tab_heading'>
                                                <span>Action</span>
                                                <span>Amount</span>
                                                <span>Deposit created</span>
                                                <span>Deposit</span>
                                                <span>Account</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='deposite_bonuses_tab_data'>
                                            <span>No record found</span>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className='active_canceled_bonuses'>
                                        <div className='active_canceled_bonus_para'>
                                            <p>This is a list of all your received and cancelled deposit bonuses. Here you can cancel your bonus.</p>

                                        </div>
                                        <div className='active_canceled_bonus_para_second'>
                                            <p>Please note that we update the bonus statistics once an hour. A bonus amount will be added to your account balance and will become withdrawable automatically within 1–2 hours after you trade the required volume.</p>
                                        </div>
                                        <div className='active_canceled_bonuses_tab'>
                                            <div className='active_canceled_bonuses_tab_heading'>
                                                <span>Deposit</span>
                                                <span>Bonus created</span>
                                                <span>Bonus amount</span>
                                                <span>Account</span>
                                                <span>Action</span>
                                            </div>
                                            <hr />
                                        </div>
                                        <div className='active_canceled_bonuses_data'>
                                            <span>No record found</span>
                                        </div>
                                    </div>
                                </TabPanel>

                            </TabContext>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageBonuses