import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const Jobs = () => {
    //const jobs = ["job1", "job2", "job3", "job4", "job5", "job6", "job7"]
    useGetAllJobs();

    const { allJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        const filteredJobs = (allJobs.length > 0 && allJobs.filter((job) => {
            if (!searchJobByText) return job;

            return job.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job.location.toLowerCase().includes(searchJobByText.toLowerCase())
                || job.jobType.toLowerCase().includes(searchJobByText.toLowerCase())
        })) || [];

        setFilterJobs(filteredJobs);

    },
        [allJobs, searchJobByText]);
    return (<div>
        <Navbar />
        <div className="max-w-7xl mx-auto mt-5">
            <div className="flex  gap-5">
                <div className="sm:w-[20%] w-[30%]">
                    <FilterCard />
                </div>
                {
                    filterJobs.length <= 0 ? <span>No Jobs Found...</span> :
                        < div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid  md:grid-cols-2 lg:gird-cols-3 pr-4 gap-4">
                                {
                                    filterJobs.map((job, index) => {
                                        return (
                                        <motion.div initial={{x:100, opacity:0}} 
                                        animate={{x:0, opacity:1} }  transition={{duration:0.3}}
                                        exit={{x:-100,opacity:0}} key={job._id}>
                                            <JobCard  job={job} />
                                        </motion.div>);
                                    })
                                }

                            </div>

                        </div>
                }
            </div>
        </div>

    </div>);
}
export default Jobs;