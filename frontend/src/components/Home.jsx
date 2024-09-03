import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { useEffect } from "react";
const Home = () => {

    useGetAllJobs();
    useEffect(()=>{
        console.log('API URL:', process.env.REACT_APP_API_URL);
    },[]);

    return (<div>
        <Navbar />
        <motion.div initial={{ y: 100, opacity: 0 }}
            
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}>
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </motion.div>

    </div>);
}

export default Home;