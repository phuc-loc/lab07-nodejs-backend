const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const adminRouter = require('./routes/admin');
// const userRouter = require('./routes/user');

const mongoConnect = require('./util/database').mongoConnect;

app.use((req, res, next) => { 
  // console.log('hello')
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err));
    next()
});

app.use('/admin', adminRouter);
// app.use('/user', userRouter);


mongoConnect(() => {
  app.listen(5001);
})
