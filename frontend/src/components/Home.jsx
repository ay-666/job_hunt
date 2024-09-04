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
    

    return (<div className="grid grid-rows-[auto,1fr,auto] min-h-screen" >
        <Navbar />
        <motion.div className=" " initial={{ y: 100, opacity: 0 }}
            
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}>
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            
        </motion.div>
        <Footer />

    </div>);
}

export default Home;