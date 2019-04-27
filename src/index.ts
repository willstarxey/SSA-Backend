import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import usersRoutes from './routes/usersRoutes';
import avisosRoutes from './routes/avisosRoutes';
import festividadesRoutes from './routes/festividadesRoutes';
import carouselRoutes from './routes/carouselRoutes';
import pagosRoutes from './routes/pagosRoutes';

class Server {
    public app : Application;
    
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config() : void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}))
    }

    routes() : void{
        this.app.use('/sistema',indexRoutes);
        this.app.use('/sistema/api/users', usersRoutes);
        this.app.use('/sistema/api/avisos', avisosRoutes);
        this.app.use('/sistema/api/festividades', festividadesRoutes);
        this.app.use('/sistema/api/carousel', carouselRoutes);
        this.app.use('/sistema/api/pagos', pagosRoutes);
    }

    start() : void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();