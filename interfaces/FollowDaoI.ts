import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    findAllUsersFollowingUser (uid: string): Promise<Follow[]>;
    userUnfollowsUser (uid1: string, uid2: string): Promise<any>;
    userFollowsUser (uid1: string, uid2: string): Promise<Follow>;
};