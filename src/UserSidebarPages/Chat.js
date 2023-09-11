import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { AiOutlineSend } from 'react-icons/ai'
import { message } from 'antd'
import axios from 'axios';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl

const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [isAdminOnline, setIsAdminOnline] = useState(false);
    const [join, setJoin] = useState('')
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("refferalMessage", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }

    };

    useEffect(() => {
        joinResponse();
        fetchChatMessage();

        adminOffline();



        //received message from admin
        socket.on("refferal_receive_message", (data) => {
            //console.log(data)
            //setMessageList((list) => [...list, data])
            fetchChatMessage();

        });

        // admin online
        // Listen for admin online
        socket.on('adminOnline', (data)=>{
            adminOffline();
        })

        // Listen for admin offline
        socket.on('falnaOffline', (data)=>{
            adminOffline();
        })
        //Clean up on component unmount
        return () => {
            socket.emit('refferalLogout', room);
            //socket.disconnect();
        }


    }, [socket]);

    const joinResponse = () => {

        socket.on("refferalResponse", (data) => {
            message.success(data);


        })
    }

    // message chat
    const fetchChatMessage = () => {
        let token = localStorage.getItem('token')
        let data = {
            room: room
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.post(`${apiurl}`+'/member/refferal/fetch-chat-message-refferal', data, config)
            .then((result) => {
                console.log(result.data.refferalChatMessage)
                //setMessageList((list) => [...list, result.data.adminChatMessage])
                setMessageList(result.data.refferalChatMessage)
            })
            .catch(err => {
                console.log(err.response)
            })
        //console.log(messageList)

    }

    const adminOffline = () => {
        let token = localStorage.getItem('token')

        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.get(`${apiurl}`+'/member/refferal/admin-online-or-not-refferal',config)
        .then((res)=>{
            setIsAdminOnline(res.data.isOnline)
        })
        .catch((err)=>{
            console.log(err.response)
        })

    }

    const statusClass = isAdminOnline ? 'online' : 'offline';
    return (
        <div className='chat-window'>
            <div className='chat-header'>

                <p>Live Chat &nbsp;<span className={statusClass}>{isAdminOnline ? 'Online' : 'Offline'}</span></p> 
                

            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent, index) => {
                        return <div key={index} className='message' id={username === messageContent.author ? "you" : "other"}>
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder='Hey...'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}><AiOutlineSend /></button>
            </div>
            <div className='chat-footer'>

            </div>
        </div>
    )
}

export default Chat