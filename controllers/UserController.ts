import {Request, Response, Express} from "express";
import UserDao from "../dao/UserDao";
import User from "../models/User"
import UserControllerI from "../interfaces/UserController";

export default class UserController implements UserControllerI {
    private userDao: UserDao = UserDao.getInstance();

    //use Singleton design pattern to get a UserControllerI instance
    private static userController: UserController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @returns userController
     */
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            //define HTTP request address
            app.get("/users", UserController.userController.findAllUsers);
            app.get("/users/:uid", UserController.userController.findUserById);
            app.post("/users", UserController.userController.createUser);
            app.put("/users/:uid", UserController.userController.updateUser);
            app.delete("/users/:uid", UserController.userController.deleteUser);
            //for testing, not RESTful
            app.delete("/users/username/:username/delete", UserController.userController.deleteUserByUsername)
        }
        return UserController.userController;
    }


    private constructor() {
    }
   findAllUsers = (req: Request, res: Response) =>
       this.userDao.findAllUsers()
           .then(users => res.json(users));
   findUserById = (req: Request, res: Response) =>
       this.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));
     createUser = (req: Request, res: Response) =>
     //res.json(req.body)
       this.userDao.createUser(req.body)
          .then(user => res.json(user));
   deleteUser = (req: Request, res: Response) =>
       this.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
   updateUser = (req: Request, res: Response) =>
       this.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));

   deleteUserByUsername = (req: Request, res: Response) =>
       this.userDao.deleteUserByUsername(req.params.username)
           .then(status => res.send(status));
}

