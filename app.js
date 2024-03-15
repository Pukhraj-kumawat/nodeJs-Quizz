const express = require('express')
const app = express();
require('dotenv').config();

const port = process.env.port || 3000

app.get('/',(req,res)=>{
    res.send('The app is working')
})



app.listen(port,()=>{
    console.log(`The server is listening for port ${port}`)
})
