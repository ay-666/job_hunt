
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '@/utils/redux/store';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import { Badge } from '../ui/badge';
import useGetApplicants from '@/hooks/useGetApplicants';
import { setApplicants } from '@/utils/redux/applicationSlice';

const shortlistStatus = ['accept', 'reject'];

const ApplicantsTable = ({ loading , jobId }) => {
    const {refetchApplicants} =  useGetApplicants(jobId);
    const { applicants } = useSelector(store => store.application);

    useEffect(()=>{

    },[]);
   

    const statusHandler = async(status,id) =>{
        console.log(status)
        try{
            const res = await axios.put(`${APPLICATION_API_END_POINT}/updateStatus/${id}`,status,{
                withCredentials:true
            });
            if(res.data.success){
                refetchApplicants();
                
                toast.success(res.data.msg);



            }

        }catch(e){
            console.log(e);
            toast.error(e.response.data.msg)
            
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>List of applicants for the job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact </TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        loading ? ( [...Array(5)].map((_, index) => (
                            <TableRow key={index} className="animate-pulse">
                                <TableCell>
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) :

                            (applicants.map((applicant) => {
                                const hasResume = applicant.applicant.profile.resume != undefined;
                                return <TableRow key={applicant._id}>
                                    <TableCell>{applicant?.applicant?.fullname}</TableCell>
                                    <TableCell>{applicant?.applicant?.email}</TableCell>
                                    <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>{hasResume ? <a href={applicant?.applicant?.profile?.resume} target="blank" className="text-blue-500 w-full cursor-pointer hover:underline">{applicant?.applicant?.profile?.resumeName}</a> : <span className="font-bold">NA</span>}</TableCell>
                                    <TableCell>{new Date(applicant?.createdAt).toISOString().split('T')[0]}</TableCell>
                                    <TableCell><Badge className= {`py-1 bg-gray-400 hover:bg-gray-500 ${applicant?.status == 'accepted' ? 'bg-green-700 hover:bg-green-800' : applicant?.status == 'rejected' && 'bg-red-700 hover:bg-red-800'  }`} >{applicant?.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {shortlistStatus.map((stat, index) => {
                                                    return (<div key={index} onClick={()=>{
                                                        
                                                        statusHandler({status :stat+"ed"},applicant?._id);
                                                    }} className='flex my-2 items-center  w-fit cursor-pointer border-b' >
                                                        <span >{stat}</span>
                                                    </div>);
                                                })}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>

                                </TableRow>
                            }))
                    }


                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;