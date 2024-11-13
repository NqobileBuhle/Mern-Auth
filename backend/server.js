import express from "express";
import dotenv from "dotenv";
import userRoutes from './Routes/userRoutes.js'
import { notFound, errorHandler} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();
// console.log(process.env.MONGO_URI);  // Ensure this outputs the correct MongoDB URI


const port=process.env.PORT ||5001;


connectDB();
const app=(express());

app.use(express.json());
app.use(express.urlencoded({extendend:true}));

app.use('/api/users',userRoutes)

app.get('/', (req,res)=>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server started on port ${port}`));