import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { useNavigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user || user.role !== 'recruiter'){
            navigate('/');
        }
    }
    ,[])




  return (
    <>
    <Outlet/>
  
    </>
  )
}

export default ProtectedRoute;