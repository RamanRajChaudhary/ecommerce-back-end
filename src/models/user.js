const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const env = require('dotenv');
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fyou8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    }).then(() => {
        console.log('Database connected');
    }).catch(() => {
        console.log('Database get some error');
    });
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    },
}, {timestamps: true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}
const user = mongoose.model('user collection', userSchema);

module.exports = user;