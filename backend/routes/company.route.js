import express from 'express'
import { registerCompany , getCompany , getCompanyById, updateCompany } from '../controllers/company.controller.js';
import userAuth from '../middlewares/userAuth.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();



router.post('/register',userAuth,registerCompany);
router.get('/get',userAuth,getCompany);
router.get('/get/:id',userAuth,getCompanyById);
router.put('/update/:id',userAuth,singleUpload,updateCompany);

export default router;