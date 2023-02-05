const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const bodyParser =  require('body-parser')
const indexRouter = require('./routes/index')
const userApiRouter = require('./routes/api/users');
const dashRouter = require('./routes/dashboard/dashboard') 

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(passport.initialize());
require('./config/passport')(passport);

const mongoose = require('mongoose')
const dbUrl = require('./config/keys').mongoURI

mongoose.connect(dbUrl,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))


app.use(cookieParser())
app.use('/dashboard',dashRouter)
app.use('/',indexRouter)

app.use('/api/users',userApiRouter)

app.listen(process.env.PORT || 3000)