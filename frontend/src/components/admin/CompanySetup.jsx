import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {

    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
  


    
    
    const navigate = useNavigate();
    

    const [loading, setLoading] = useState(false);


    const {singleCompany} = useSelector(store=>store.company)
    

    useEffect(() => {
        
        
      
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website ||  "",
            location: singleCompany?.location ||  "", 
            file: singleCompany?.file ||  null
        })
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append('file', input.file);
        }


        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.msg);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.msg);

        }
        finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 py-6'>
                        {/* <Button variant="outline" onClick={() => { navigate('/admin/company') }} className="text-gray-500 flex items-center gap-2 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button> */}
                        <h1 className='text-xl font-bold'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>

                        <div>
                            <Label>Company Name</Label>
                            <Input name="name" value={input.name} onChange={changeEventHandler} type="text" />

                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input name="description" value={input.description} onChange={changeEventHandler} type="text" />

                        </div>
                        <div>
                            <Label>Company Website</Label>
                            <Input name="website" value={input.website} onChange={changeEventHandler} type="text" />

                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input name="location" value={input.location} onChange={changeEventHandler} type="text" />

                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input onChange={changeFileHandler} type="file" accept="image/*" />

                        </div>

                    </div>
                    <div className='flex gap-4'>
                    <Button className="w-full mt-8 "  onClick={() => { navigate('/admin/company') }}>Exit</Button>

                    {loading ? <Button className="w-full mt-8 " type="submit"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> :
                        <Button className="w-full mt-8 " type="submit">Update</Button>}
                    </div>

                    
                </form>

            </div>
        </div>
    );
}

export default CompanySetup;