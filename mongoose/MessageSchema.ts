/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * Create the MessageSchema to represent message document instances stored in a MongoDB database.
 * @typedef Message represents a message
 * @property {String} content message's content
 * @property {ObjectId} sentFrom user reference
 * @property {ObjectId} sentTo user reference
 * @property {Date} sentOn message's creation time
 *
 */
const MessageSchema = new mongoose.Schema<Message>({
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    message: String,
    sentOn: Date // Ask if this is necessary, then ask how to populate it
}, {collection: "messages"});
export default MessageSchema;