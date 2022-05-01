/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * Create the LikeSchema to represent like document instances stored in a MongoDB database.
 * @typedef Follow represents like relationship between a user and another user
 * @property {ObjectId} user user reference
 * @property {ObjectId} follower user reference
 *
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;