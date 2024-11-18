import express from "express";
import dotenv from "dotenv";
import userRoutes from './Routes/userRoutes.js';
import carRoutes from './Routes/carRoutes.js';
import { notFound, errorHandler} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';


dotenv.config();
// console.log(process.env.MONGO_URI);  // Ensure this outputs the correct MongoDB URI


const port=process.env.PORT ||5001;


connectDB();
const app=(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Existing code for other routes like authentication
app.use('/api/cars', carRoutes);





app.use(bodyParser.urlencoded({ extended: true }));


 app.use(cookieParser());
app.use('/api/users',userRoutes)

app.get('/', (req,res)=>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server started on port ${port}`));