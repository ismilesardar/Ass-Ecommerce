import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth'
import Loading from './Loading';

const PrivateRoute = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
      
        auth?.token ? setOk(true) : setOk(false);

    }, [auth?.token])
    

  return (
    ok ? <Outlet/> : <Loading />
  );
}

export default PrivateRoute