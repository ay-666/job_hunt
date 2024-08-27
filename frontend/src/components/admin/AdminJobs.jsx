import React from 'react'
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import useGetAdminJobs from '@/hooks/useGetAdminJobs';
import { setSearchJobByText } from '@/utils/redux/jobSlice';
import { toast } from 'sonner';

const AdminJobs = () => {
    const [searchInput , setSearchInput] = useState();
    const dispatch = useDispatch();
    const {companies} = useSelector(store=> store.company);
   
    useEffect(()=>{
        dispatch(setSearchJobByText(searchInput));
    },[searchInput]);
    
    useGetAdminJobs();
    
    const navigate = useNavigate();
    return (<div>
        <Navbar />

        <div className="max-w-7xl mx-auto my-10 ">
            <div className="flex justify-between items-center my-5">
                <Input type="text" className="w-fit" onChange={(e)=>{setSearchInput(e.target.value)}} placeholder="Filter by company, role"/>
                <Button onClick={()=>{
                    companies.length > 0 ? navigate('/admin/jobs/post') : toast.error("Register a company first");
                }}>Post New Job</Button>
            </div>

            <AdminJobsTable/>
            
            


        </div>
    </div>)
}

export default AdminJobs;