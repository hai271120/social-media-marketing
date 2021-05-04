require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const fileUpLoad = require('express-fileupload')
app.use(express.json())
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
app.use(cookieParser())
app.use(cors())
app.use(fileUpLoad({
    useTempFiles:true
}))
//router
 app.use('/user',require('./Route/userRouter'))
 app.use("/api",require("./Route/InfluencersRouter"))
 app.use("/api",require("./Route/categoryRouter"))
 app.use("/api",require("./Route/upload"))
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
},err=>{
    if(err) throw err;
    console.log('connent mongo');
});
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is runing`,PORT);
})
