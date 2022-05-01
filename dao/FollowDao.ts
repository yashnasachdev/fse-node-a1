/**
 * @file Implements DAO managing data storage of likes. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage of follows
 * @implements {FollowDaoI} FollowDaoI
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns followDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Uses FollowsModel to retrieve all follows documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedby: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Uses FollowsModel to retrieve all follows documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({following: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Inserts follow instance into the database
     * @param {string} uid1 Follower(User)'s primary key
     * @param {string} uid2 User's primary key
     * @returns {Promise} To be notified when follow is inserted into the database
     */
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({userFollowing: uid1, userFollowed: uid2});

    /**
     * Removes follow instance from the database
     * @param {string} uid1 Follower(User)'s primary key
     * @param {string} uid2 User's primary key
     * @returns {Promise} To be notified when follow is removed from the database
     */
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid1, userFollowed: uid2});

}
