import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { setSingleJob, setAppliedJobs } from '@/utils/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';



function JobDescription() {


  //custom hook
  useGetAppliedJobs();

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { singleJob ,appliedJobs} = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  

  const [isApplied, setIsApplied] = useState(false);
  



  useEffect(() => {
    
    const getSingleJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }

      } catch (e) {
        console.log(e);

      } finally {
        setLoading(false);
      }
    }
    getSingleJob();


  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    const alreadyApplied = appliedJobs.some(appliedJob => appliedJob?.job?._id === jobId);
    setIsApplied(alreadyApplied);
  }, [appliedJobs, jobId]);




  const applyJobHandler = async () => {

    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, {
        withCredentials: true
      });

      
      if (res.data.success) {
        toast.success(res.data.msg);

        //   dispatch(setSingleJob({
        //     ...singleJob,
        //     applications: [...singleJob.applications, { applicant: user._id }]
        //   })
        // );
        setIsApplied(true);

      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.msg);

    }
  }






  return (
    <div className='max-w-7xl mx-auto my-10 border border-gray-200 p-4 rounded-lg'>
      {loading ? (
        <div className="animate-pulse">
          {/* Title shimmer */}
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>

          {/* Badge shimmer */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>

          {/* Button shimmer */}
          <div className="h-10 w-32 bg-gray-300 rounded mb-6"></div>

          {/* Description shimmer */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ) : (<>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
            <div className='flex items-center mt-4 gap-2 flex-wrap'>
              <Badge variant="outline" className="text-blue-700 ">{singleJob?.jobType}</Badge>
              <Badge variant="outline" className="text-red-700 ">{singleJob?.experience}</Badge>
              <Badge variant="outline" className="text-green-700 ">{singleJob?.salary?.val} {singleJob?.salary?.salaryType}</Badge>

            </div>

          </div>
          {isApplied || loading ? <Button disabled={isApplied} variant="outline" className="bg-gray-600 w-[104px] hover:bg-gray-600 hover:text-white text-white">Applied</Button> : <Button onClick={applyJobHandler} className="bg-purple-600  hover:bg-purple-800 text-white hover:text-white" variant="outline">Apply Now</Button>}


        </div>
        <h1 className='border-b-2 my-3 py-4 font-medium'>Job Description</h1>
        <div className='my-4'>
          <h1 className='font-bold my-1'>Company: <span className='pl-4 font-normal text-gray-800'>{singleJob?.company?.name}</span></h1>
          <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
          <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
          <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
          <h1 className='font-bold my-1'>Required Skills: <span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements.join(',')}</span></h1>
          <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience !== 0 ? singleJob?.experience + " years" : "fresher"}</span></h1>
          <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary?.val} {singleJob?.salary?.salaryType}</span></h1>
          <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob ? new Date(singleJob?.createdAt).toISOString().split('T')[0] : "date"}</span></h1>
        </div>
      </>)
      }


    </div>
  );
}

export default JobDescription;