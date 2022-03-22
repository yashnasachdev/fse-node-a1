import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllUsersFollowedByUser (req: Request, res: Response): void;
    findAllUsersFollowingUser (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
};