import React, { useEffect , useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setApplicants } from '@/utils/redux/applicationSlice';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constants';


const useGetApplicants = (jobId) => {

    const dispatch = useDispatch();
    const [loading ,setLoading] = useState(false);

    useEffect(()=>{
        getApplicants();
        
    },[jobId]);
    const getApplicants =async () =>{
        try{
            setLoading(true);
            const res = await axios.get(`${APPLICATION_API_END_POINT}/getApplications/${jobId}`,{
                withCredentials:true
            });
            

            if(res.data.success){
                dispatch(setApplicants(res.data.job[0]?.applications));
            }
        }catch(e){
            console.log(e);
            toast.error(e.response.data.msg);
            
        }finally{
            setLoading(false);
        }
    }
    return { refetchApplicants: getApplicants }; 
}

export default useGetApplicants;