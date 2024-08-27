import React, { useState } from 'react'
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useSelector } from 'react-redux';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { jobSchema } from '@/utils/types';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: {
            val: "",
            salaryType: "LPA"
        },
        location: "",
        jobType: "",
        experience: "",
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState({});

    const { companies } = useSelector(store => store.company);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });

        validateField(e.target.name, e.target.value);
    }

    const selectChangeHandler = (value) => {


        setInput({ ...input, companyId: value });
    }

    const validateField = (name, value) => {
        const parsed = jobSchema.safeParse({ ...input, [name]: value });
       
        
        if (!parsed.success) {
            const fieldError = parsed.error.issues.find(issue => issue.path[0] === name);
            setErrors(prevErrors => ({
              ...prevErrors,
              [name]: fieldError ? fieldError.message : "",
            }));
          } else {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
          }
    }


    // Handle salary value input change
    const handleSalaryChange = (e) => {
        setInput({
            ...input,
            salary: {
                ...input.salary,
                val: e.target.value
            }
        });
    };

    // Handle salary type change
    const handleSalaryTypeChange = (value) => {
        setInput({
            ...input,
            salary: {
                ...input.salary,
                salaryType: value
            }
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const parsed = jobSchema.safeParse(input);
    
        

        if (!parsed.success) {
            parsed.error.issues.forEach((error) => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [error.path[0]]: error.message,
                }));
            });
            return;
        }
        
        
        

        try {
            setLoading(true);

            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.msg);
                navigate('/admin/jobs');

            }

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.msg);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-10'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" value={input.title} name="title" onChange={changeEventHandler} className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            {errors.title && <p  className="text-red-500  text-sm">{errors.title}</p>}
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            {errors.description && <p  className="text-red-500  text-sm">{errors.description}</p>}
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            {errors.requirements && <p  className="text-red-500  text-sm">{errors.requirements}</p>}
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            {errors.location && <p  className="text-red-500  text-sm">{errors.location}</p>}
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="number" name="val" value={input.salary.val} onChange={handleSalaryChange} className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            {errors.salary && <p  className="text-red-500  text-sm">{errors.salary}</p>}
                        </div>
                        <div>
                            <Label>Salary Type</Label>
                            <RadioGroup className="mt-2" onValueChange={handleSalaryTypeChange}>
                                <div className='flex items-center gap-2'>

                                    <RadioGroupItem value="LPA"></RadioGroupItem>
                                    <Label>LPA (Lakhs Per Annum)</Label>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <RadioGroupItem value="K/month"></RadioGroupItem>
                                    <Label>K Per Month </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            {errors.experience && <p  className="text-red-500  text-sm">{errors.experience}</p>}
                        </div>
                        
                        <div>
                            <Label>Job Type</Label>
                            <RadioGroup className="mt-2" onValueChange={(value) => { setInput({ ...input, jobType: value }) }}>
                                <div className='flex items-center gap-2'>

                                    <RadioGroupItem value="full-time"></RadioGroupItem>
                                    <Label>full-time</Label>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <RadioGroupItem value="part-time"></RadioGroupItem>
                                    <Label>part-time</Label>
                                </div>
                            </RadioGroup>
                        </div>
                       

                    </div>
                    <Select onValueChange={selectChangeHandler}>
                        <SelectTrigger className="my-5">
                            <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    companies.map((company) => {
                                        return (<SelectItem key={company?._id} value={company?._id}>{company?.name}</SelectItem>);
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div>
                        {
                            loading ? <Button className="w-full my-5"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-5">Post</Button>
                        }

                    </div>

                </form>


            </div>
        </div>
    );
}

export default PostJob;