import express from 'express';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to mongodb');
}).catch((err) => {
  console.log(err.message);
})
const app = express();

app.listen(3000 , () => {
  console.log('Server is running..');
}
)