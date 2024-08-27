import express from 'express';
import {register , logout , login , updateProfile} from '../controllers/user.controller.js'
import userAuth from '../middlewares/userAuth.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();


router.post('/register',singleUpload,register);
router.post('/login',login);
router.put('/profile/update',userAuth,singleUpload,updateProfile);
router.post('/logout',logout);


export default router;