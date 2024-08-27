import {COMPANY_API_END_POINT } from '@/utils/constants';
import { setSingleCompany } from '@/utils/redux/companySlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useGetCompanyById= (companyId)=> {

    const dispatch = useDispatch();
    

    useEffect(()=>{
        const getSingleCompany = async ()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{
                    withCredentials:true
                });
    
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                    
                }
    
            }catch(e){
                console.log(e);
                
            }
        }
        getSingleCompany();
        
    },[companyId,dispatch]);


}

export default useGetCompanyById;