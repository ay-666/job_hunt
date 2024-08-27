import { JOB_API_END_POINT } from '@/utils/constants';
import { setAllJobs, setLoading, setSearchQuery } from '@/utils/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const useGetAllJobs= ()=> {

    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store=>store.job);

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchQuery(""));
        }
    },[])

    useEffect(()=>{
        const getAllJobs = async ()=>{
            try{
                dispatch(setLoading(true));
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{
                    withCredentials:true
                });
    
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
    
            }catch(e){
                console.log(e);
                
            }finally{
                dispatch(setLoading(false));
            }
        }
        getAllJobs();
        
    },[]);


}

export default useGetAllJobs;