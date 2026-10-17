import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

//router
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

//middleware
import errorHandlerMiddleware from './middleware/errorHandler.js';
import { authenticateUser } from './middleware/authMiddleware.js';

//public
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app=express();

const __dirname=dirname(fileURLToPath(import.meta.url))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname,'./client/dist')))
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());


app.use('/api/v1/jobs',authenticateUser,jobRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',authenticateUser,userRouter)

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client/dist','index.html'))
})

app.use('*',(req,res)=>{
    res.status(404).json({msg:'Not Found'});
})

app.use(errorHandlerMiddleware);

const port=process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port,()=>{
        console.log(`server running on PORT ${port}...`);
    })
} catch (error) {
    console.log(error);
    process.exit(1);
    
}

