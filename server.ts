import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import UserDao from './dao/UserDao';

import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/tuiter').then(() => {
    console.log("Connected to DB");
  });;

const app = express();

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

var userDao: UserDao;
userDao = new UserDao();
const userController = new UserController(app, userDao);

const PORT = 4000;
app.listen(process.env.PORT || PORT);