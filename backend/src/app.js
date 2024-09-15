import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from"./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
 
app.use(cors());

app.set("port" , (process.env.PORT) || 4040);


app.get("/" , (req ,res) =>{
    return res.json({"hello" : "world!"})
} 
);
  

app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit : "40k" , extended :true}));



app.use("/api/v1/users" , userRoutes);


const start = async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://riyanshshah:SYNC08@cluster0.ifbnc.mongodb.net/")
   console.log(`MONGO connected DB HOST : ${connectionDb.connection.host}`)
    server.listen(app.get("port") , ()=>{
        console.log("LISTENING ON PORT 4040")
    });
};

start();