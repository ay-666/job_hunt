import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/utils/redux/jobSlice";
import Autoplay from "embla-carousel-autoplay";
const CategoryCarousel = () => {
    const category = ["Frontend Developer", "Backend Developer", "Cloud Architect", "Graphic Designer",
        "Video Editor", "Full Stack Developer", "Data Engineer", "Devops Engineer"];
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const searchHandler = (query) =>{
            dispatch(setSearchQuery(query));
            navigate('/browse');
        }


    return (<div className="flex justify-center  items-center my-20 ">
        <Carousel opts={{
            align: "start",
            loop: true,
        }} plugins={[Autoplay({delay:2000})]} 
        className="max-w-xl mx-auto " >
            <CarouselContent className="mx-auto flex justify-around">
                {category.map((item,index) => {
                    return <CarouselItem key={index} className="basis-1/2  lg:basis-1/3 text-lg"><Button onClick={()=>{searchHandler(item)}} variant="outline"  
                    className="rounded-full bg-purple-100 hover:bg-purple-300">
                        {item}</Button></CarouselItem>
                })}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>);
}

export default CategoryCarousel;