import { JOB_API_END_POINT } from '@/utils/constants';
import { setAdminJobs } from '@/utils/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';
import axios from 'axios';

const useGetAdminJobs = () => {
  const dispatch= useDispatch();
  useEffect(()=>{
    getAdminJobs();
  },[])
  const getAdminJobs = async () =>{
    try{
        const  res = await axios.get(`${JOB_API_END_POINT}/getRecruiterJobs`,{
            withCredentials:true
        });

        if(res.data.success){
            dispatch(setAdminJobs(res.data.jobs));
        }
    }catch(e){
        console.log(e);
        toast.error(e.response.data.msg);
        
    }
  }

  return {refetchAdminJobs : getAdminJobs};
}

export default useGetAdminJobs