import User from "./User";


/**
 * @typedef Follow Represents follows relationship between two users
 * @property {User} userFollowing User following the other
 * @property {User} userFollowed User being followed
 */

export default interface Follow {
    userFollowing: User,
    userFollowed: User
};