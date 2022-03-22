import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessagesSentByUser (req: Request, res: Response): void;
    findAllMessagesSentToUser (req: Request, res: Response): void;
    userMessagesUser (req: Request, res: Response): void;
    userUnmessagesUser (req: Request, res: Response): void;
};