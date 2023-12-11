const express =require("express");
const app = express();
require('dotenv').config();
const {connection} = require("./db");
const {UserRouter} = require('./Routes/user.routes')
const {PostRouter} = require("./Routes/post.routes");

app.use(express.json());
app.use('/users',UserRouter);
app.use('/posts',PostRouter);8



app.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log("Server is running at port 4000");
        console.log("MongoDB Database connected succsessfully");
    } catch (error) {
        console.log(error);
    }
})