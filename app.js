const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

app.use((req, res, next) => { 
  console.log('hello')
    User.findById('638da528760d3570ef58bc70')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRouter);
app.use('/user', userRouter);


mongoConnect(() => {
  app.listen(5001);
})
