import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import companyRoute from "./routes/company.route.js"
import userRoute from './routes/user.routes.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({});

const app = express();

app.use(express.json());


app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: '*',
    credentials:true
}
app.use(cors(corsOptions));

app.get("/home",(req,res)=>{
    return res.status(200).json({
        msg:"Backend message"
    });
});

// user api's

app.use("/api/v1/user",userRoute);

// company apis

app.use("/api/v1/company",companyRoute);

app.use('/api/v1/jobs',jobRoute);


app.use('/api/v1/applications',applicationRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../frontend')));

// Handle routing, send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});


const PORT = process.env.PORT || 3000 ;


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at ${PORT} port.` );
})
