/**
 * @file Declares Message data type representing relationship between
 * users, as in user messages another user
 */
import User from "./User";

/**
 * @typedef Message Represents messages relationship between users,
 * as in a user messages another user
 * @property {User} from User that is messaging
 * @property {User} to User that got messaged
 */

export default interface Message {
    from: User,
    to: User,
    message: string,
    sentOn: Date
};