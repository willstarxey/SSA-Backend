import { Router } from 'express';
import { carouselController } from '../controllers/carouselController';

class CarouselRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.get('', carouselController.index);
        this.router.get('/:id', carouselController.view);
        this.router.post('', carouselController.create);
        this.router.put('/:id', carouselController.update);
        this.router.delete('/:id', carouselController.delete);
    }
}

const carouselRoutes = new CarouselRoutes();
export default carouselRoutes.router;