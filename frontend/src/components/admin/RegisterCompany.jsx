import React, { useState } from 'react'
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/utils/redux/companySlice';

const RegisterCompany = () => {
    const navigate = useNavigate();
    const [input , setInput] = useState({});

    const dispatch = useDispatch();

    const registerCompany = async()=>{
        
        try{
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });

            if(res.data.success){
                dispatch(setSingleCompany(res.data.newCompany));
                toast.success(res.data.msg);
                const companyId = res?.data?.newCompany?._id;
                navigate(`/admin/company/${companyId}`);
            }

        }catch(e){
            console.log(e);
            toast.error(e.response.data.msg);
            
            
        }
    }
    const inputHandler = (e)=>{
        setInput({...input , [e.target.name] : e.target.value });
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 p-4'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                </div>
                <Label>Company Name</Label>
                <Input name="name" type="text" onChange={inputHandler} className="my-2" placeholder="Eg. Amazon" />

                <div className='flex items-center gap-2 my-10' >
                    <Button variant="outline" className="border-black" onClick={()=>{navigate('/admin/company')}}>Cancel</Button>
                    <Button onClick={()=>registerCompany()}>Continue</Button>
                </div>
            </div>
        </div>
    );
}

export default RegisterCompany;