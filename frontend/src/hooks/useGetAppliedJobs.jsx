import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAppliedJobs } from "@/utils/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";


const useGetAppliedJobs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getAppliedJobs();
    }, []);

    const getAppliedJobs = async () => {
        try {
            const jobRes = await axios.get(`${APPLICATION_API_END_POINT}/getAppliedJob`, {
                withCredentials: true
            });

            if (jobRes.data.success) {
                dispatch(setAppliedJobs(jobRes.data.applications));
            }
        } catch (e) {
            console.log(e);
            toast.error(e.response?.data?.msg || 'Failed to fetch applied jobs');

        }


    }



}


export default useGetAppliedJobs;