import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { useEffect, useState } from "react";
import useInitials from "@/hooks/useInitials";
import { persistor } from "../../utils/redux/store";
const Navbar = () => {

    const user = useSelector(store => store.auth.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [initials, setInitials] = useState("");

    

    useEffect(() => {
        user && setInitials(useInitials(user?.fullname));
    }, [user])

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`,{}, {
                withCredentials: true
            });
            if (res.data.success) {
                // dispatch(setUser(null));
                // dispatch(setAppliedJobs([]));



                // Dispatch RESET action to clear Redux state
                dispatch({ type: 'RESET' });

                // Purge persisted state
                await persistor.purge();


                navigate('/');
                toast.success(res.data.msg);
            }

        } catch (e) {
            console.log(e);
            toast.error(e?.response?.data?.msg);

        }
    }

 

    return <div className="bg-blue-400 ">
        <div className="gap-1  grid grid-rows-2   sm:flex  sm:items-center sm:justify-between px-2 pb-3 sm:pb-0 mx-auto max-w-7xl h-16">
            <div><h1 className=" text-lg md:text-xl lg:text-2xl font-bold">Job<span className="text-red-500" >Portal</span></h1></div>
            <div className="flex  xs:flex-row items-center justify-between sm:justify-start gap-5 md:gap-14">
                <ul className="flex font-bold text-sm md:text-md  h-full items-center gap-5 ">
                    {
                        user && user.role === 'recruiter' ? (
                            <>
                                <Link to='/admin/company'><li>Companies</li></Link>
                                <Link to='/admin/jobs'><li>Jobs</li></Link>
                            </>
                        ) : (<>
                            <Link to='/'><li>Home</li></Link>
                            <Link to='/jobs'><li>Jobs</li></Link>
                            <Link to='/browse'><li>Browse</li></Link>
                        </>)
                    }

                </ul>

                {!user ? (<div className=" flex items-center gap-2">
                    <Link to='/login'><Button className="size-10 xs:size-full xs:text-sm text-xs" variant="outline">Login</Button></Link>
                    <Link to='/signup'><Button className="size-10 xs:size-full xs:text-sm text-xs bg-purple-800 hover:bg-purple-900">Signup</Button> </Link>


                </div>) : (<Popover >
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={user?.profile?.profilePic} alt="profile_img" />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-40 md:max-w-72 mx-1 ">
                        <div className="flex gap-2 items-center ">
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user?.profile?.profilePic} alt="profile_img" />
                                <AvatarFallback >{initials}</AvatarFallback>
                            </Avatar>

                            <div >
                                <h2 className="font-medium">{user.fullname}</h2>
                                <p className="text-sm text-ellipsis text-muted-foreground">{user.profile.bio ? user.profile.bio : "{Bio}"}</p>
                            </div>

                        </div>
                        <div className="flex flex-col items-start my-2">
                            {user && user.role === "student" && (<div className="flex items-center w-fit cursor-pointer ">
                                <User />
                                <Button onClick={() => { navigate('/profile') }} variant="link">View Profile</Button>
                            </div>)

                            }

                            <div className="flex items-center w-fit cursor-pointer  ">
                                <LogOut /><Button onClick={logoutHandler} variant="link" >Logout</Button>
                            </div>

                        </div>

                    </PopoverContent>
                </Popover>)}



            </div>
        </div>
    </div>
}

export default Navbar;