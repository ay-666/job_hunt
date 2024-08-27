import React from 'react'
import LatestJobsCard from './LatestJobsCard';
import { useSelector } from 'react-redux';


const  LatestJobs =({job}) => {
    //const jobs = ["job1","job2","job3","job4","job5","job6","job7","job8"];

   const {allJobs} = useSelector(store=> store.job) ;
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-semibold'>Latest Job Openings</h1>
        <div className='grid grid-cols-3 gap-4 my-5'>
        {allJobs.length <= 0 ?<span className='font-bold'>No Job Available</span> :allJobs.slice(0,6).map((job,index)=> <LatestJobsCard key={job._id} job={job}></LatestJobsCard>)}
        </div>
        
    </div>
  );
}

export default LatestJobs;