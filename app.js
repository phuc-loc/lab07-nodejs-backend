const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const errorController = require('./controllers/error')

const mongoose = require('mongoose');
const User = require('./models/user');


app.use((req, res, next) => { 
  // console.log('hello')
    User.findById('6392e3ebad0fa8875aaba813')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use(errorController.get404)

// mongoConnect(() => {
//   app.listen(5001);
// })
mongoose
  .connect('mongodb+srv://Loc_nguyen:mDEMfSQT_Dr5est@cluster0.xrlivxz.mongodb.net/exercise?retryWrites=true&w=majority')
  .then(result => {
    User 
    .findOne()
    .then (user => {
      if(!user){
        const user = new User ({
          name: "ABC",
          email: "ABC@mail.com",
          cart: {
            items: []
          }
        })
        user.save()
      }
    })
    app.listen(5001)
  })
  .catch(err => {
    console.log(err)
  })