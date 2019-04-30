import { Router } from 'express';
import { usersController } from '../controllers/usersController';

class UsersRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.get('', usersController.index);
        this.router.get('/pagos/:id', usersController.userDetails);
        this.router.get('/list', usersController.users);
        this.router.post('/login', usersController.login);
        this.router.get('/:id', usersController.view);
        this.router.post('', usersController.create);
        this.router.put('/:id', usersController.update);
        this.router.delete('/:id', usersController.delete);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;