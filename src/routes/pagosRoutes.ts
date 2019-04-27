import { Router } from 'express';
import { pagosController } from '../controllers/pagosController';

class PagosRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.get('/', pagosController.index);
        this.router.get('/:id', pagosController.view);
        this.router.post('/', pagosController.create);
        this.router.put('/:id', pagosController.update);
        this.router.delete('/:id', pagosController.delete);
    }
}

const pagosRoutes = new PagosRoutes();
export default pagosRoutes.router;