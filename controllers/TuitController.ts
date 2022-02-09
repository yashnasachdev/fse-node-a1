import {Request, Response, Express} from "express";
import TuitDao from "../dao/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
   app: Express;
   tuitDao: TuitDao;
   constructor(app: Express, tuitDao: TuitDao) {
       this.app = app;
       this.tuitDao = tuitDao;
       this.app.get('/tuits', this.findAllTuits);
       this.app.get('/tuits/:tuitid', this.findTuitById);
       this.app.get('/users/:uid/tuits',this.findTuitsByUser);
       this.app.post('/tuits', this.createTuit);
       this.app.delete('/tuits/:tuitid', this.deleteTuit);
       this.app.put('/tuits/:tuitid', this.updateTuit);
   }
   findAllTuits = (req: Request, res: Response) =>
       this.tuitDao.findAllTuits()
           .then(tuits => res.json(tuits));
   findTuitById = (req: Request, res: Response) =>
       this.tuitDao.findTuitById(req.params.tuitid)
           .then(tuit => res.json(tuit));
   findTuitsByUser = (req: Request, res: Response) =>
          this.tuitDao.findTuitsByUser(req.params.uid)
              .then(tuits => res.json(tuits));
   createTuit = (req: Request, res: Response) =>
       this.tuitDao.createTuit(req.body)
           .then(tuit => res.json(tuit));
   deleteTuit = (req: Request, res: Response) =>
       this.tuitDao.deleteTuit(req.params.tuitid)
           .then(status => res.json(status));
   updateTuit = (req: Request, res: Response) =>
       this.tuitDao.updateTuit(req.params.tuitid, req.body)
           .then(status => res.json(status));
}

