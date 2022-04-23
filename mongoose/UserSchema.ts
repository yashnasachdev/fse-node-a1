import mongoose from "mongoose";
import User from "../models/User";
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    },
}, {collection: "users"});

export default UserSchema;