import { COMPANY_API_END_POINT } from '@/utils/constants';
import { setCompanies } from '@/utils/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    getAllCompanies();
  },[])

  const getAllCompanies = async() =>{
    try{
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{
            withCredentials:true
        });
        if(res.data.success){
            dispatch(setCompanies(res.data.companies));
        }
    }catch(e){
        console.log(e);
        toast.error(e.response.data.msg);
        
    }
  }
}

export default useGetAllCompanies;