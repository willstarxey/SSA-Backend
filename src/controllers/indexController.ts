import { Request, Response } from 'express';

class IndexController {
    index (req : Request, res : Response) {
        res.send('Index Controller');
    }
}

export const indexController = new IndexController();  