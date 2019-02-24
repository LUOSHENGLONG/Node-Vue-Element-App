const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/runoob";

// const MongoClient = require('mongodb').MongoClient;
 
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("数据库已创建!");
//   db.close();
// });

// DB config
const db = require('./config/keys').mongoURI

const profiles = require('./routes/api/profiles')
const users = require('./routes/api/users')
const passport = require("passport");       //引入passport插件

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());     //passport初始化
require("./config/passport")(passport);

//解决跨域问题
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
  });
app.use('/api/users',users)
app.use('/api/profiles',profiles)

mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.json({msg: 'success'})
})


const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`server is running at port ${ port }`)
})