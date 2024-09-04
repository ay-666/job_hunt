import {  Contact, Edit, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";
import { useEffect, useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import useInitials from "@/hooks/useInitials";

const Profile = () => {
    useGetAppliedJobs();
    const  [open , setOpen] = useState(false);
    const skills = ["Html","Css","Js","React"];
    const {user} = useSelector(store=> store.auth);
    const hasResume = user?.profile?.resume !== undefined ;
    const [initials, setInitials] = useState("");

    useEffect(()=>{
        user && setInitials(useInitials(user.fullname));
    },[user])
    
    return (<div>
        <Navbar />
        <div className="max-w-4xl scale-90 md:scale-100 mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20" >
                        <AvatarImage  src={user?.profile?.profilePic}></AvatarImage>
                        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-medium text-xl">{ user ? user?.fullname : "Full Name"} </h1>
                        <p>{ user ?  user?.profile?.bio : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid illum odit illo modi porro rem accusamus natus aspernatur molestiae eveniet?"}</p>
                    </div>

                </div>
                {/* <Button className="text-right size-5" variant="outline"><Pen /></Button> */}
                <button onClick={()=>{
                    setOpen(true);
                }} className="border-none h-0  m-0  "><Edit /></button>
            </div>


            <div className="my-5">
                <div className="flex gap-3 items-center my-2">
                    <Mail /><span>{user ? user?.email : "unknown@email.com"}</span>
                </div>
                <div className="flex gap-3 items-center my-2"><Contact /><span>{user ? user?.phoneNumber : "0000000000"}</span></div>

            </div>

            <div className="my-5">
                <h1 className="text-lg font-semibold">Skills</h1>
                <div className="flex gap-2 my-2"> {
                    !user || user?.profile?.skills.length >0 ?
                    user?.profile?.skills.map((item,index)=>{
                        return (<Badge variant="outline" key={index}>{item}</Badge>);
                    })
                    : (<span className="font-bold">NA</span>)
                }
                </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-2">
                <h1 className="text-lg font-semibold">Resume</h1>
                {   
                    hasResume ? <a href= {user?.profile?.resume} target="blank" className="text-blue-500 w-full cursor-pointer hover:underline">{user?.profile?.resumeName}</a> : <span className="font-bold">NA</span>
                }
            </div>




        </div>
            <div className="max-w-4xl my-5 mx-auto p-2 bg-white rounded-2xl">
                <h1 className="text-lg font-bold my-5">Applied Jobs</h1>
                <AppliedJobs/>


            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>)
}
export default Profile;