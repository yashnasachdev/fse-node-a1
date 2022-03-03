import mongoose, {Schema} from "mongoose"

const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: Date,
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
//              password: {type: String, required: true},
//              firstName: String,
//              lastName: String,
//              email: String,
//              profilePhoto: String,
//              headerImage: String,
//              accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
//              maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
//              biography: String,
//              dateOfBirth: Date,
//              joined: {type: Date, default: Date.now},
//              location: {
//               latitude: {type: Number, default: 0.0},
//               longitude: {type: Number, default: 0.0},
//              }}
}, {collection: "tuits"})
export default TuitSchema;