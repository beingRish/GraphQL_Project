import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        requireed: true
    },
    lastName: {
        type: String,
        requireed: true
    },

    email: {
        type: String,
        requireed: true
    },
    password: {
        type: String,
        requireed: true
    },
})

mongoose.model("User", userSchema);