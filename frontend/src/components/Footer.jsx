import { ScanFaceIcon } from "lucide-react";
import fblogo from '../assets/facebook.svg';
import xlogo from '../assets/twitterx.svg';
import ldlogo from '../assets/linkedin.svg';

const Footer = () =>{
    return (<div className="flex items-center justify-between mx-auto p-10   border-t border-t-gray-200">
        <div className="">
            <h2 className="text-xl font-bold">Job Hunt</h2>
            <p className="text-sm">&#169; 2024 Job Hunt. All rights reserved.</p>
        </div>
        <div className="flex gap-2">
            <a href="https://www.facebook.com"><img className="max-w-10" src={fblogo} /></a>
            <a href="https://www.linkedin.com"><img className="w-10" src={ldlogo} /></a>
            <a href="https://www.x.com"><img className="max-w-10" src={xlogo} /></a>
        </div>
    </div>);
}
export default Footer;