/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../dao/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class TuitController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the users followd by a user with uid
 *     </li>
 *     <li>GET /api/follows/:uid to retrieve all users that are following them
 *     </li>
 *     <li>POST /api/users/:uid1/follows/:uid2 to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid1/follows/:uid2 to record that a user
 *     no londer follows another</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/following", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followedby", FollowController.followController.findAllUsersFollowingUser);
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/follows/:uid2", FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all users that followd a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(following => res.json(following));

    /**
     * Retrieves all tuits followd by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were following the user with uid
     */
    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowingUser(req.params.uid)
            .then(followedby => res.json(followedby));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is following the other
     * and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unfollowing
     * the other and the user being unfollowd
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
};