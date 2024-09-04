
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
import { Button } from '../ui/button';

const shortlistStatus = ['accept', 'reject'];

const ApplicantsTable = ({ loading, jobId }) => {
    const { refetchApplicants } = useGetApplicants(jobId);
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {

    }, []);


    const statusHandler = async (status, id) => {
        console.log(status)
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/updateStatus/${id}`, status, {
                withCredentials: true
            });
            if (res.data.success) {
                refetchApplicants();

                toast.success(res.data.msg);



            }

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.msg)

        }
    }

    return (
        <div className=' ' >
            <Table className="hidden md:table">
                <TableCaption className="">List of applicants for the job</TableCaption>
                <TableHeader className="">
                    <TableRow className=" ">
                        <TableHead className="">Full Name</TableHead>
                        <TableHead className="">Email</TableHead>
                        <TableHead className="">Contact </TableHead>
                        <TableHead className="">Resume</TableHead>
                        <TableHead className="">Applied On</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">

                    {
                        loading ? ([...Array(5)].map((_, index) => (
                            <TableRow key={index} className="animate-pulse">
                                <TableCell className="">
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
                                return <TableRow key={applicant._id} className="">
                                    <TableCell className="">{applicant?.applicant?.fullname}</TableCell>
                                    <TableCell className="">{applicant?.applicant?.email}</TableCell>
                                    <TableCell className="">{applicant?.applicant?.phoneNumber}</TableCell>
                                    <TableCell className="">{hasResume ? <a href={applicant?.applicant?.profile?.resume} target="blank" className="text-blue-500 w-full cursor-pointer hover:underline">{applicant?.applicant?.profile?.resumeName}</a> : <span className="font-bold">NA</span>}</TableCell>
                                    <TableCell className="">{new Date(applicant?.createdAt).toISOString().split('T')[0]}</TableCell>
                                    <TableCell className=""><Badge className={`py-1 bg-gray-400 hover:bg-gray-500 ${applicant?.status == 'accepted' ? 'bg-green-700 hover:bg-green-800' : applicant?.status == 'rejected' && 'bg-red-700 hover:bg-red-800'}`} >{applicant?.status}</Badge></TableCell>
                                    <TableCell className="md:text-right ">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {shortlistStatus.map((stat, index) => {
                                                    return (<div key={index} onClick={() => {

                                                        statusHandler({ status: stat + "ed" }, applicant?._id);
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
            <div className="grid sm:grid-cols-2 gap-3 md:hidden">
                {applicants.map((applicant) => {
                    const hasResume = applicant.applicant.profile.resume != undefined;
                    return <div key={applicant._id} className="p-4 shadow-md flex justify-between   border rounded-md text-sm ">
                        <div className='flex-cols space-y-2'>
                            <p><strong>Full Name:</strong> {applicant.applicant.fullname}</p>
                            <p><strong>Email:</strong> {applicant.applicant.email}</p>
                            <p><strong>Contact:</strong> {applicant.applicant.phoneNumber}</p>

                            <p><strong>Applied on:</strong> {new Date(applicant?.createdAt).toISOString().split('T')[0]}</p>

                            <div><strong>Status:</strong> <span className={`${applicant?.status == 'accepted' ? 'text-green-500' : applicant?.status == 'rejected' &&'text-red-500' } text-gray-500 font-medium `}>{applicant.status}</span>
                            </div>
                            <p><strong>Status:</strong> {hasResume ? <a href={applicant?.applicant?.profile?.resume} target="blank" className="text-blue-500 w-full cursor-pointer hover:underline">{applicant?.applicant?.profile?.resumeName}</a> : <span className="font-bold">NA</span>}</p>
                        </div>
                        <div>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="bg-purple-100 hover:bg-purple-200 scale-90" variant="outline">Action</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {shortlistStatus.map((stat, index) => {
                                        return (<div key={index} onClick={() => {

                                            statusHandler({ status: stat + "ed" }, applicant?._id);
                                        }} className='flex my-2 items-center  w-fit cursor-pointer border-b' >
                                            <span >{stat}</span>
                                        </div>);
                                    })}
                                </PopoverContent>
                            </Popover>

                        </div>




                    </div>

                }
                )}
            </div>
        </div>
    )
}

export default ApplicantsTable;