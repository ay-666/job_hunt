import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Delete, DeleteIcon, Edit, Edit2, Edit3, Eye, LucideDelete, MoreHorizontalIcon, Pen, PenIcon, Trash, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constants';
import useGetAdminJobs from '@/hooks/useGetAdminJobs';

const AdminJobsTable = () => {
    const { adminJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(adminJobs);
    const { searchJobByText } = useSelector(store => store.job);
    const navigate = useNavigate();
    const { refetchAdminJobs } = useGetAdminJobs();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const filteredJobs = (adminJobs.length > 0 && adminJobs.filter((job) => {
            if (!searchJobByText) return adminJobs;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })) || [];

        setFilterJobs(filteredJobs);

    }, [searchJobByText, adminJobs]);

    const removeHandler = async (jobId) => {
        try {
            setFilterJobs(true);
            const res = await axios.delete(`${JOB_API_END_POINT}/deleteRecuiterJob/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                refetchAdminJobs();
                toast.success(res.data.msg);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.msg || "Error occured during removal");

        }finally{
            setLoading(false);
        }
    }


    return (
        <div>
            <Table>
                <TableCaption>List of jobs posted by you</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {filterJobs.length > 0 ?

                        loading ? ([...Array(5)].map((_, index) => (
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
                            <>

                        {
                            filterJobs.map((job) => {

                                return (
                                    <TableRow key={job._id}>

                                        <TableCell>{job?.company?.name}</TableCell>
                                        <TableCell>{job?.title}</TableCell>
                                        <TableCell>{new Date(job?.createdAt).toISOString().split('T')[0]}</TableCell>
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontalIcon /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => { removeHandler(job._id) }} className='flex items-center gap-2 w-fit cursor-pointer '>
                                                        <Trash2 className='w-4' />
                                                        <span>Remove</span>
                                                    </div>
                                                    <div onClick={() => { navigate(`/admin/jobs/${job._id}/applicants`) }} className='flex gap-2 items-center w-fit cursor-pointer mt-2'>
                                                        <Eye className='w-4' />
                                                        <span>Applicants</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                        </>

                : <TableRow><TableCell colSpan={4} align="center"><div className='flex items-center justify-center '>No Matching Jobs found... </div ></TableCell></TableRow>}

            </TableBody>
        </Table>
        </div >
    )
}

export default AdminJobsTable;