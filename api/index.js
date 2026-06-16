import express from 'express';
import mongoose from 'mongoose';
import dotenv from"dotenv";
dotenv.config();
import userRouter from './routes/user.route.js'; //Renaming the router
import authRouter from './routes/auth.route.js';
import uploadRouter from './routes/upload.route.js';
import listingRouter from './routes/listing.route.js';


mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to mongodb');
  
}).catch((err) => {
  console.log(err.message);
});

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.listen(3000 , () => {
  console.log('Server is running..');
}
);

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,

  })
})