import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, USER_API_END_POINT } from "@/utils/constants";
import {  setLoading, setUser } from "@/utils/redux/authSlice";
import {setAppliedJobs} from '@/utils/redux/jobSlice'
import { Loader2 } from "lucide-react";
import { loginSchema } from "@/utils/types";



const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loading = useSelector(store => store.auth.loading)

    const { user } = useSelector(store => store.auth);

    const [inputError,setInputError] = useState("");

    const validateField = (name, value) => {
        const parsed = loginSchema.safeParse({ ...input, [name]: value });
        
        

        if (!parsed.success) {
            const fieldError = parsed.error.issues[0];
            setInputError( fieldError ? fieldError.message : "" );
        } else {
            setInputError("");
        }
    }


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        validateField(e.target.name , e.target.value);
        

    }
    useEffect(() => {

        if (user){
            if(user.role === 'recruiter') navigate('/admin/company');
            else navigate('/');
        }
        


    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsed = loginSchema.safeParse(input);
        if(!parsed.success){
            setInputError(parsed.error.issues[0]);
            return ;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {

                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });


            if (res.data.success) {
                toast.success(res.data.msg);

                dispatch(setUser(res.data.user));



                
            }

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.msg ||"server error");
        } finally {
            dispatch(setLoading(false));
        }

    }
    return (<div>
        <Navbar />
        <div className="flex items-center justify-center mx-auto max-w-7xl">
            <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-5 my-10">
                <h1 className="font-bold text-xl mb-5">Login</h1>
                <div>
                    <Label>Email</Label>
                    <Input type='email' onChange={changeEventHandler} name="email" placeholder="Jonh@email.com"></Input>
                    {inputError && <p className="text-red-500 text-sm">{inputError}</p>}
                </div>
                <div>
                    <Label>Password</Label>
                    <Input type='password' onChange={changeEventHandler} name="password" placeholder="Password"></Input>
                </div>
                <div className="flex items-center justify-between">
                    <RadioGroup onValueChange={(val) => {
                        setInput({ ...input, role: val });
                    }} name="role" className="flex gap-4  my-5" defaultValue="student">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="student" id="option-one" />
                            <Label htmlFor="option-one">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="recruiter" id="option-two" />
                            <Label htmlFor="option-two">Recruiter</Label>
                        </div>
                    </RadioGroup>

                </div>
                {
                    loading ? <Button className="my-5 w-full" ><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> :
                        <Button type="Submit" className="my-5 w-full">Login</Button>
                }



                <span className="text-sm">Don't have an account? </span> <Link to="/signup" className="text-blue-500">Signup</Link>
            </form>
        </div>
    </div>);
}
export default Login;