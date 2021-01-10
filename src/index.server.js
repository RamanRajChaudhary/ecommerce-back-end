const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const {user} = require('./models/user');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));


//const mongoose = require('mongoose');

//routes
//const userRoutes = require('./routes/user');

// environment varible 


//mongodb connection
//mongodb+srv://root:<password>@cluster0.fyou8.mongodb.net/<dbname>?retryWrites=true&w=majority


/// middleware created

app.post('/signup',

async(req, res) => {
 console.log(" raju pappu");
 try{
    await user.findOne({email: req.body.email});
    // .exec((error, user) => {
    //     if(user) return res.status(400).json({
    //         message: 'user already registered'
    //     });
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const _user = new user ({
             firstName,
             lastName,
             email,
             password,
             username: Math.random().toString()
            });
            _user.save((error, data) => {
                if(error){ return res.status(400).json({
                    message: 'user already registered'
                });
            } 
            if(data){
                return res.status(201).json({
                    message: 'user created Sucessfully..!'
                })
            } 
            });
    //}); 
}catch(e){console.log(e.message);}
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});