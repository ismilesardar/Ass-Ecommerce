import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth'
import Loading from './Loading'

const AdminRoute = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [ok, setOk] = useState(false);

    useEffect(() => {
      const adminCheck = async ()=>{
        const {data} = await axios.get(`/admin-check`);
        data.ok ? setOk(true) : setOk(false);
        // console.log(data)
      }
      if(auth?.token) adminCheck();
    }, [auth?.token]);
     
  return (ok ? <Outlet /> : <Loading path="" />)
}

export default AdminRoute