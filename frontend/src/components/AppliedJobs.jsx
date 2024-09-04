import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

function AppliedJobs() {
    const {appliedJobs} = useSelector(store=>store.job);
    // const appliedJobs = [
    //     {date:"12-08-2024",
    //         jobRole:"Frontend Developer",
    //         company:"Google",
    //         selected:"Selected"

    //     },
    //     {date:"02-07-2024",
    //         jobRole:"Fullstack Developer",
    //         company:"Amdocs",
    //         selected:"Rejected"

    //     },  
    // ]
  return (
    <div className=''>
        <Table>
            <TableCaption>List of applied Jobs
            </TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className="text-xs sm:text-sm">
                {
                    appliedJobs.map((item,index)=>{
                        return (<TableRow key={item._id}>
                            <TableCell>{new Date(item?.createdAt).toISOString().split('T')[0]}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company?.name}</TableCell>
                            <TableCell className="text-right"><Badge className= {`py-1 bg-gray-400 hover:bg-gray-500 ${item?.status == 'accepted' ? 'bg-green-700 hover:bg-green-800' : item?.status == 'rejected' && 'bg-red-700 hover:bg-red-800'  }`} >{item?.status}</Badge></TableCell>
                        </TableRow>);
                    })
                }
            </TableBody>
            

        </Table>
    </div>
  )
}

export default AppliedJobs;