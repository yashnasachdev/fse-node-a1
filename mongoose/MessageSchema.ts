import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

const MessageSchema = new mongoose.Schema<Message>({
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    message: String,
    sentOn: Date // Ask if this is necessary, then ask how to populate it
}, {collection: "messages"});
export default MessageSchema;