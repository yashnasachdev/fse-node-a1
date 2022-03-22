import Message from "../models/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesSentToUser (uid: string): Promise<Message[]>;
    userUnmessagesUser (uid1: string, uid2: string, mid:string): Promise<any>;
    userMessagesUser (uid1: string, uid2: string, mid: string): Promise<Message>;
};