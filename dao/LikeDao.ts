import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";


/**
 * @file Implements DAO managing data storage of Likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}
    /**
    * Uses LikeModel to retrieve all like documents from likes collection
    * @returns Promise To be notified when the likes are retrieved from
    * database
    */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    /**
    * Uses LikeModel to retrieve all like documents from likes collection
    * @returns Promise To be notified when the likes are retrieved from
    * database
    */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    /**
    * Inserts like instance into the database
    * @param {string} uid Primary key of user liking the tuit
    * @param {string} tid Primary key of tuit being liked
    * @returns Promise To be notified when like is inserted into the database
    */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
    /**
    * Removes like from the database.
    * @param {string} uid Primary key of user unliking the tuit
    * @param {string} tid Primary key of tuit being unliked
    * @returns Promise To be notified when like is removed from the database
    */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
};