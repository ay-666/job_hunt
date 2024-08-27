import express from "express"
import { postJob , getAllJobs , getJobById ,getRecruiterJobs, deleteRecuiterJob} from "../controllers/job.controller.js";
import userAuth from "../middlewares/userAuth.js";



const router = express.Router();


router.post('/post',userAuth,postJob);
router.get('/get',userAuth,getAllJobs);
router.get('/get/:id',userAuth,getJobById);
router.get('/getRecruiterJobs',userAuth,getRecruiterJobs);
router.delete('/deleteRecuiterJob/:id',userAuth,deleteRecuiterJob);


export default router;
