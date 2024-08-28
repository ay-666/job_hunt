import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "@/utils/redux/authSlice";
import { Loader2 } from "lucide-react";
import { signupSchema } from "@/utils/types";

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: 1000000000,
        password: "",
        role: "student",
        file: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    },
        [user]);


    const validateField = (name, value) => {
        const parsed = signupSchema.safeParse({ ...input, [name]: value });
        
        

        if (!parsed.success) {
            const fieldError = parsed.error.issues.find((issue) => issue.path[0] === name);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError ? fieldError.message : "" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
    }


    // to handle input change event
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

        validateField(name, value);
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        //console.log(input);

        const parsed = signupSchema.safeParse(input);

        if (!parsed.success) {
            parsed.error.issues.forEach((error) => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [error.path[0]]: error.message,
                }));
            });
            return;
        }



        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file)
            formData.append('file', input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {

                toast.success(res.data.msg);
                navigate('/login');
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
        <div className="flex items-center    justify-center mx-auto max-w-7xl">
            <form onSubmit={submitHandler} className="w-1/2  border border-gray-200 rounded-md p-5 my-10">
                <h1 className="font-bold text-xl mb-5">Signup Here</h1>
                <div>
                    <Label>Full Name</Label>
                    <Input type='text' name="fullname" onChange={changeEventHandler} placeholder="Jonh Doe"></Input>
                    {errors.fullname && <p  className="text-red-500  text-sm">{errors.fullname}</p>}
                </div>
                <div>
                    <Label>Email</Label>
                    <Input type='email' name="email" onChange={changeEventHandler} placeholder="Jonh@email.com"></Input>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <Label>Phone Number</Label>
                    <Input type='number' name="phoneNumber" onChange={changeEventHandler} placeholder="10 digit-number"></Input>
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                </div>
                <div>
                    <Label>Password</Label>
                    <Input type='password' name="password" onChange={changeEventHandler} placeholder="Password"></Input>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <RadioGroup onValueChange={(val) => { setInput({ ...input, role: val }) }} name="role" className="flex gap-4  my-5" defaultValue="student">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="student" id="option-one" />
                            <Label htmlFor="option-one">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="recruiter" id="option-two" />
                            <Label htmlFor="option-two">Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div className="flex items-center gap-3">
                        <Label>Profile</Label>

                        {/* For File Upload */}

                        <Input onChange={changeFileHandler} accept="image/*" type="file" className="cursor-pointer"></Input>
                    </div>
                </div>
                {
                    loading ? <Button className="my-5 w-full" ><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> :
                        <Button type="Submit" className="my-5 w-full">Signup</Button>
                }
                <span className="text-sm">Already have an account? </span> <Link to="/login" className="text-blue-500">Login</Link>
            </form>
        </div>
    </div>);
}
export default Signup;