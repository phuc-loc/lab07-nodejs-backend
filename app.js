const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use( bodyParser.urlencoded( {extended: false} ) );
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user')

app.use('/admin', adminRouter);

app.use('/user', userRouter);  

app.listen(5001); 