/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../dao/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the messageing HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/messages/:uid to retrieve all message sent to a user
 *     </li>
 *     <li>POST /api/users/:uid1/messages/:uid2/:mid to record that a user messages another user
 *     </li>
 *     <li>DELETE /api/users/:uid1/messages/:uid2/:mid to record that a user
 *     deleted a message that was sent to another user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/messages/:uid", MessageController.messageController.findAllMessagesSentToUser);
            // TODO ask Ta about these two urls
            app.post("/api/users/:uid1/messages/:uid2/:mid", MessageController.messageController.userMessagesUser);
            app.delete("/api/users/:uid1/messages/:uid2/:mid", MessageController.messageController.userUnmessagesUser);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all users that messaged a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the messageing user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all tuits messaged by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who is being messaged
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were messageing the user with uid
     */
    findAllMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentToUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1, uid2 and mid representing the user that is sending the message, the user receiving the message
     * and the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid1, req.params.uid2, req.params.mid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1, uid2 and mid representing the user that is deleting the message, the other user
     * and the message
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userUnmessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userUnmessagesUser(req.params.uid1, req.params.uid2, req.params.mid)
            .then(status => res.send(status));
};