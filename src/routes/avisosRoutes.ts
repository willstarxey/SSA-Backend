import { Router } from 'express';
import { avisosController } from '../controllers/avisosController';

class AvisosRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.get('/', avisosController.index);
        this.router.get('/:id', avisosController.view);
        this.router.post('/', avisosController.create);
        this.router.put('/:id', avisosController.update);
        this.router.delete('/:id', avisosController.delete);
    }
}

const avisosRoutes = new AvisosRoutes();
export default avisosRoutes.router;