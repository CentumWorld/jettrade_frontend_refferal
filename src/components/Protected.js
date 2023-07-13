import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export const Protected = (props) => {
    const {Component} = props;
    const nevigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem('login');
        
        //console.log(login);
        if(!login){
            nevigate('/')
        }
      
    },[]);
  return (
    <div>
        <Component/>
    </div>
  )
}
