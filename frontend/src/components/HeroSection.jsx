import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/utils/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [query,setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchHandler = () =>{
        dispatch(setSearchQuery(query));
        navigate('/browse');
    }

    return (<div className="px-4  text-center mt-2">
        <div className="flex flex-col gap-3 my-6">
            <span className="mx-auto px-4 text-sm md:text-base py-2 rounded-full bg-gray-100 font-medium text-red-600">No.1 Job Hunt Site</span>
            <h1 className="md:text-4xl text-2xl font-semibold">Search, Apply & <br />Get Your <span className="text-purple-700">Dream Job</span> </h1>
            <p>"Everyone has something to contribute to this world. It's just a matter of being given that opportunity to do so."</p>
        </div>
        <div className="flex xs:w-[62%]   sm:w-[40%] md:shadow-md rounded-full border border-gray-200 pl-3 items-center gap-4  mx-auto">
            <input type="text" onChange={(e)=>{setQuery(e.target.value)}} placeholder="Find your dream job" className="  w-full text-sm sm:text-md  outline-none border-none" ></input>
            <Button onClick={searchHandler} className="rounded-r-full bg-purple-700 hover:bg-purple-900" ><Search className="h-5 w-5" /></Button>
        </div>

    </div>)
}
export default HeroSection;