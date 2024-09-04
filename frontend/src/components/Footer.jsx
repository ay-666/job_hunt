import { ScanFaceIcon } from "lucide-react";
import fblogo from '../assets/facebook.svg';
import xlogo from '../assets/twitterx.svg';
import ldlogo from '../assets/linkedin.svg';

const Footer = () =>{
    return (<div className="flex flex-col-reverse xs:flex-row items-center justify-between mx-auto px-8 py-5  w-full  border-t border-t-gray-200">
        <div className="flex xs:block items-center gap-2">
            <h2 className="text-sm xs:text-base md:text-xl font-bold">Job Hunt</h2>
            <p className="text-xs md:text-sm">&#169; 2024 Job Hunt. All rights reserved.</p>
        </div>
        <div className="flex flex-between  md:flex-start gap-2">
            <a href="https://www.facebook.com"><img className="max-w-10" src={fblogo} /></a>
            <a href="https://www.linkedin.com"><img className="w-10" src={ldlogo} /></a>
            <a href="https://www.x.com"><img className="max-w-10" src={xlogo} /></a>
        </div>
    </div>);
}
export default Footer;