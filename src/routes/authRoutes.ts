import { Router } from 'express';
import { usersController } from '../controllers/usersController';

class AuthRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('', usersController.login);

    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
