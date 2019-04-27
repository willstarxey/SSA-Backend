import { Request, Response } from 'express';
import pool from '../database';

class PagosController {
    public async index (req : Request, res : Response) : Promise<any>{
        const Pagos = await pool.query('SELECT * FROM PAGOS');
        res.json(Pagos);
    }

    public async create(req : Request, res : Response) : Promise<void>{
        await pool.query('INSERT INTO PAGOS SET ?', [req.body]);
        res.json({message : "El Pago ha sido insertado"});
    }

    public async update(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE PAGOS SET ? WHERE id = ?', [req.body,id]);
        res.json({message : "El Pago ha sido actualizado"});
    }

    public async delete(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM PAGOS WHERE id = ?', [id]);
        res.json({message : "El Pago ha sido eliminado"});
    }

    public async view(req : Request, res : Response) : Promise<any>{
        const { id } = req.params;
        const Pago = await pool.query('SELECT * FROM PAGOS WHERE id = ?', [id]);
        if(Pago.length > 0){
            return res.json(Pago);
        }
        res.status(404).json({text: "Pago no encontrado"});
    }
}

export const pagosController = new PagosController();  