import { users, quotes } from './fakedb.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';

const User = mongoose.model("User");

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { _id }) => users.find(user => user._id == _id),
        quotes: () => quotes,
        iquote: (_, { by }) => quotes.filter(quote => quote.by == by) 
    },
    User: {
        quotes: (user) => quotes.filter(quote => quote.by == user._id)
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({email: userNew.email})
            console.log(user)
            if(user) {
                throw new Error("User already exists with that email")
            }
            
            const hashedPassword = await bcrypt.hash(userNew.password, 12)

            const newUser = new User({
                ...userNew,
                password: hashedPassword
            })

            return await newUser.save()
        },

        signinUser: async (_, { userSignin }) => {
            const user = await User.findOne({email: userSignin.email})   
            console.log(user)
            if(!user) {
                throw new Error("User doesn't exists with that email")
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if(!doMatch) {
                throw new Error("email or password is invalid");
            }
            const token = jwt.sign({userId: user._id}, JWT_SECRET)
            return {token}
        },
    }
}

export default resolvers