const express = require('express')
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect')
const router = require('./routes/authRoute');
const cookieParser = require('cookie-parser');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

const port = process.env.port || 3000

app.use(cookieParser());

app.use('/',router);



connectDB(process.env.MONGO_SECRET_KEY)
    .then(()=>{
        console.log('Connected to DB...');
        app.listen(port,()=>{
            console.log(`The server is listening for port ${port}`)
        })

        app.get('/',(req,res)=>{
            res.send('The app is working')
        })        
    })
    .catch((err)=>{
        console.error(err);
    })




