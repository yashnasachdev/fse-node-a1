import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;