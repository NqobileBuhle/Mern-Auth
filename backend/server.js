import express from "express";
import dotenv from "dotenv";
import userRoutes from './Routes/userRoutes.js'

dotenv.config();

const port=process.env.PORT ||5001;

const app=express();
app.use('/api/users',userRoutes)

app.get('/', (req,res)=>res.send('Server is ready'));

app.listen(port,()=>console.log(`Server started on port ${port}`));