import React from 'react'
import Navbar from './shared/Navbar';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

function Browse() {
  
  useGetAllJobs();
  const { allJobs, loading } = useSelector(store => store.job);
 
  return (
    <div >
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='text-xl font-bold my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
            loading ? [...Array(6)].map((_, index) => (
              <div key={index} className="p-5 w-80 h-72 animate-pulse  rounded-md shadow-lg bg-gray-400 border border-gray-200">
              </div>
            )) :

              allJobs.map((job, index) => {
                return (< motion.div initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}
                  exit={{ x: -100, opacity: 0 }} key={job._id}>
                  <JobCard job={job}  />
                </motion.div>);
                
            })}
        </div>
      </div>

    </div>
  )
}

export default Browse;