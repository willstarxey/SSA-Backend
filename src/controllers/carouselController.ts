import { Request, Response } from 'express';
import pool from '../database';

class CarouselController {
    public async index (req : Request, res : Response) : Promise<any>{
        const carousel = await pool.query('SELECT * FROM CAROUSEL');
        res.json(carousel);
    }

    public async create(req : Request, res : Response) : Promise<void>{
        await pool.query('INSERT INTO CAROUSEL SET ?', [req.body]);
        res.json({message : "El Carousel ha sido insertado"});
    }

    public async update(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE CAROUSEL SET ? WHERE id = ?', [req.body,id]);
        res.json({message : "El Carousel ha sido actualizado"});
    }

    public async delete(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM CAROUSEL WHERE id = ?', [id]);
        res.json({message : "El Carousel ha sido eliminado"});
    }

    public async view(req : Request, res : Response) : Promise<any>{
        const { id } = req.params;
        const carousel = await pool.query('SELECT * FROM CAROUSEL WHERE id = ?', [id]);
        if(carousel.isResolved.length > 0){
            return res.json(carousel);
        }
        res.status(404).json({text: "Carousel no encontrado"});
    }
}

export const carouselController = new CarouselController();  