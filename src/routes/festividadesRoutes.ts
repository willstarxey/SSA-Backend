import { Router } from 'express';
import { festividadesController } from '../controllers/festividadesController';

class FestividadesRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.get('/', festividadesController.index);
        this.router.get('/:id', festividadesController.view);
        this.router.post('/', festividadesController.create);
        this.router.put('/:id', festividadesController.update);
        this.router.delete('/:id', festividadesController.delete);
    }
}

const festividadesRoutes = new FestividadesRoutes();
export default festividadesRoutes.router;