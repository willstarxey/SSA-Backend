import { Request, Response } from 'express';
import pool from '../database';

class FestividadesController {
    public async index (req : Request, res : Response) : Promise<any>{
        const festividades = await pool.query('SELECT * FROM FESTIVIDADES');
        res.json(festividades);
    }

    public async create(req : Request, res : Response) : Promise<void>{
        await pool.query('INSERT INTO FESTIVIDADES SET ?', [req.body]);
        res.json({message : "La festividad ha sido insertado"});
    }

    public async update(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE FESTIVIDADES SET ? WHERE id = ?', [req.body,id]);
        res.json({message : "La festividad ha sido actualizado"});
    }

    public async delete(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM FESTIVIDADES WHERE id = ?', [id]);
        res.json({message : "La festividad ha sido eliminado"});
    }

    public async view(req : Request, res : Response) : Promise<any>{
        const { id } = req.params;
        const festividad = await pool.query('SELECT * FROM FESTIVIDADES WHERE id = ?', [id]);
        if(festividad.length > 0){
            return res.json(festividad);
        }
        res.status(404).json({text: "Festividad no encontrado"});
    }
}

export const festividadesController = new FestividadesController();  