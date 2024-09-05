import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constants';
import { setUser } from '@/utils/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: ""
    });
    const dispatch = useDispatch();
    

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio || "{bio}");
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);

        }

        try {
            setLoading(true);

            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Contet-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.msg);
            }

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.msg);

        }finally{
            setLoading(false);
        }
        setOpen(false);
        
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] m-2" >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input type="text" id="name" name="fullname" value={input.fullname} onChange={changeEventHandler} className="col-span-3"></Input>
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input type="email" id="email" name="email" value={input.email} onChange={changeEventHandler} className="col-span-3"></Input>
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="number" className="text-right">Contact</Label>
                                <Input type="number" id="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3"></Input>
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input type="text" id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3"></Input>
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input type="text" id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3"></Input>
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input id="file" name="file" onChange={fileChangeHandler} type="file" accept="application/pdf"
                                    className="col-span-3"></Input>
                            </div>


                        </div>
                        <DialogFooter>
                        {loading ? <Button className="my-5 w-full" ><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> :
                        <Button type="Submit" className="my-5 w-full">Update</Button>}
                        </DialogFooter>

                    </form>
                    
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default UpdateProfileDialog;