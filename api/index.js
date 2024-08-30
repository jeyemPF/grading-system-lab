import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
const app = express();
dotenv.config()

const connect = async () =>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongo DB")
    } catch (error) {
       throw error
    };

};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected")
})

app.get('/', (req, res) => {
    res.send('Grading System!')
});




app.listen(8800, ()=>{
    connect()
    console.log("Connected to the backend")
})
