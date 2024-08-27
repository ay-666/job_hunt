import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage , AvatarFallback} from "./ui/avatar";
import { Badge } from './ui/badge';
import { useNavigate } from "react-router-dom";
import useInitials from "@/hooks/useInitials";

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const calculateDaysAgo=(creationDate)=>{
        if(creationDate){
            const date = new Date(creationDate);
            const currentDate = new Date();
            const timeDiff = currentDate - date;

            const daysAgo = timeDiff/(1000*60*60*24);
            return Math.floor(daysAgo);
        }
        
        return -1;
    }
    const intitials = useInitials(job?.company?.name);
    
    
    return (<div className="p-5 rounded-md shadow-lg bg-white border border-gray-200">

        <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">{calculateDaysAgo(job?.createdAt) === 0 ? "Today" : `${calculateDaysAgo(job?.createdAt)} days ago` } </p>
            <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
        </div>
        <div className="flex items-center gap-2 my-2">

            <Button variant="outline" className="p-6" size="icon" >
                <Avatar>
                    <AvatarImage  src={job?.company?.logo}></AvatarImage>
                    <AvatarFallback>{intitials}</AvatarFallback>
                </Avatar>
                
            </Button>
            <div>
                <h1 className="text-lg font-medium">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">{job?.location}</p>
            </div>
        </div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-gray-500 text-sm">{job?.description}</p>
        <div className='flex items-center mt-4 gap-2 flex-wrap'>
            <Badge variant= "outline" className="text-blue-700 ">{job?.jobType}</Badge>
            <Badge variant= "outline" className="text-red-700 ">{job?.experience !== 0 ? job?.experience +" years" : "fresher"}</Badge>
            <Badge variant= "outline" className="text-green-700 ">{job?.salary?.val} {job?.salary?.salaryType}</Badge>
        </div>
        <div className="flex gap-2 mt-4">
            <Button onClick={( )=>{
                navigate(`/jobs/description/${job._id}`);
            }} variant="outline">Details</Button>
            <Button variant="outline" className='bg-purple-600 text-white hover:text-white hover:bg-purple-800'>Save for later</Button>
        </div>
    </div>);
}

export default JobCard;