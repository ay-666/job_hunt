import React from 'react'
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
const  LatestJobsCard =({job}) => {
  const navigate = useNavigate();
  return (
    <div className='p-5 rounded-md shadow-lg border border-gray-100' onClick={()=>{
      navigate(`/jobs/description/${job?._id}`);
    }}>
        <div>
        <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center mt-4 gap-2 flex-wrap'>
            <Badge variant= "outline" className="text-blue-700 ">{job?.jobType}</Badge>
            <Badge variant= "outline" className="text-red-700 ">{job?.experience !== 0 ? job?.experience +" years" : "fresher"}</Badge>
            <Badge variant= "outline" className="text-green-700 ">{job?.salary?.val} {job?.salary?.salaryType}</Badge>
        </div>
    </div>
  );
}

export default LatestJobsCard;