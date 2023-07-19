import React, { useState } from 'react';
import { Modal } from 'antd';
import share from '../img/share-icon.png'
import whatsapp from '../img/whatsapp.png'
import facebook from '../img/facebook1.png'
import twitter from '../img/twitter.png'
import '../css/InviteFriend.css';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl


const InviteFriend = () => {
    const inviteCode = localStorage.getItem('refferal')

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleImageClick = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleShareWhatsApp = () => {
        const link = "http://trader.jettradefx.in";
        const message = `Join us with invite code: ${inviteCode}\n\n${link}`;
        
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      };
    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <div>
                    <img src={share} alt="Image" onClick={handleImageClick} style={{ width: '225px', height: '225px' }} />
                    <p style={{ fontFamily: 'Calibri' }}>Share Now, Reffer and Earn Money</p>
                </div>

                <Modal
                    open={isModalVisible}
                    onCancel={handleModalClose}
                    onOk={handleModalClose}
                    footer={null}
                >

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                        <div className="image-container">
                            <img src={whatsapp} alt="Image 1" onClick={handleShareWhatsApp} className="resized-image"/>
                            <img src={facebook} alt="Image 2" className="resized-image"/>
                            <img src={twitter} alt="Image 3" className="resized-image"/>
                        </div>
                    </div>
                </Modal>
            </div>

        </>
    )
}

export default InviteFriend