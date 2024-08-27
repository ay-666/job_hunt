import express from 'express';

import { applyJob , getApplications , getAppliedJobs , updateStatus } from '../controllers/application.controller.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

router.post('/apply/:id',userAuth,applyJob);
router.get('/getAppliedJob',userAuth,getAppliedJobs);
router.get('/getApplications/:id',userAuth,getApplications);
router.put('/updateStatus/:id',userAuth,updateStatus);


export default router;