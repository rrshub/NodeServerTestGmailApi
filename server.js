let express = require("express");
let cors = require('cors')
let bodyparser = require('body-parser')
let http = require('http')
const path = require('path');
const multer = require('multer')
let dotenv = require('dotenv')





let storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "apis/uploads/");
  },
  filename: (req, files, cb) => {
    cb(null, Date.now() + path.extname(files.originalname))
    console.log(files)
  }
});
let upload = multer({
  storage: storage
//dest : "apis/uploads/"
});

let app = express();



app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
dotenv.config();
app.use('/token',require('./token'))

app.use('/thrList',require('./thread/threadList'))
app.use('/thrMsg',require('./thread/threadMsg'))
app.use('/msgList',require('./Inbox/msgList'))
app.use('/inbox',require('./Inbox/getMsg'))

// app.use('/index', express.static(path.join(__dirname,"oauthToken.html")))


http.createServer(app).listen(8080)
console.log("server listen 8080")

