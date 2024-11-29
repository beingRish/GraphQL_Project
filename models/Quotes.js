import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        requireed: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

mongoose.model("Quote", quoteSchema);