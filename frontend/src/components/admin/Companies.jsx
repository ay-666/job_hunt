import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/utils/redux/companySlice";

const Companies = () => {

    useGetAllCompanies();
    const [searchInput , setSearchInput] = useState();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompanyByText(searchInput));
    },[searchInput]);
    const navigate = useNavigate();
    
    return (<div>
        <Navbar />

        <div className="max-w-7xl mx-auto my-10 ">
            <div className="flex justify-between items-center my-5">
                <Input type="text" className="w-fit" onChange={(e)=>{setSearchInput(e.target.value)}} placeholder="Filter by name"/>
                <Button onClick={()=>{navigate('/admin/company/register')}}>New Company</Button>
            </div>
            <CompaniesTable/>
            


        </div>
    </div>)
}
export default Companies;