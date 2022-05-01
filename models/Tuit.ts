import User from "./User";

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};

