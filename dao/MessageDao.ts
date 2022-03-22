import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();
    findAllMessagesSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();
    userMessagesUser = async (uid1: string, uid2: string, mid:string): Promise<Message> =>
        MessageModel.create({from: uid1, to: uid2, message: mid});
    userUnmessagesUser = async (uid1: string, uid2: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({from: uid1, to: uid2, message: mid});

}
