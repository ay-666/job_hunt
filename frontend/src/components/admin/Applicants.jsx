import React, { useEffect ,useState} from 'react'
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '@/utils/redux/applicationSlice';
import useGetApplicants from '@/hooks/useGetApplicants';

const Applicants = () => {
    const params = useParams();
    useGetApplicants(params.id);
    
    
    const {applicants} = useSelector(store=> store.application);
    const [loading ,setLoading] = useState(false);
    
    

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto px-2'>
            <h1 className='text-xl my-5 font-bold'>Applicants ({applicants?.length})</h1>
            <ApplicantsTable loading={loading} jobId ={params.id} />
        </div>
    </div>
  )
}

export default Applicants;