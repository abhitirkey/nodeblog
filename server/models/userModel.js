import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    DOB: {type: Date, default: Date('1970-01-01')},
    lastLoginDateTime: {type: Date, default: Date.now}
})

const userModel = mongoose.model("userModel", userSchema);

export default userModel;