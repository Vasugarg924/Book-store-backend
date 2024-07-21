import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js"
import cors from "cors";
import userRoute from "./route/user.route.js"

import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();




const PORT=process.env.PORT || 4000;
const URI = process.env.MongoDBURI;




// Connect to mongodb
try {
     mongoose.connect(URI, {
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}


app.get("/",(req,res)=>{
    res.send("bookstore app");
})

// defining routes
app.use("/book",bookRoute);
app.use("/user",userRoute);

// deployement
const dirPath=path.resolve();
app.use(express.static(path.join(dirPath,"")))

// API endpoint to fetch books
app.get('/book', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
});