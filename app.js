const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json()); 
app.use( bodyParser.urlencoded( {extended: false} ) );

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const sequelize = require('./util/database');
 app.use('/admin', adminRouter);
//  app.use('/user', userRouter);  
sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(5001);
        })
    .catch(err => console.log(err))

// app.listen(5001)