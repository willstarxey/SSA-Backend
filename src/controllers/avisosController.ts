import { Request, Response } from 'express';
import pool from '../database';

class AvisosController {
    public async index (req : Request, res : Response) : Promise<any>{
        const avisos = await pool.query('SELECT * FROM AVISOS');
        res.json(avisos);
    }

    public async create(req : Request, res : Response) : Promise<void>{
        await pool.query('INSERT INTO AVISOS SET ?', [req.body]);
        res.json({message : "El aviso ha sido insertado"});
    }

    public async update(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE AVISOS SET ? WHERE id = ?', [req.body,id]);
        res.json({message : "El aviso ha sido actualizado"});
    }

    public async delete(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM AVISOS WHERE id = ?', [id]);
        res.json({message : "El aviso ha sido eliminado"});
    }

    public async view(req : Request, res : Response) : Promise<any>{
        const { id } = req.params;
        const aviso = await pool.query('SELECT * FROM AVISOS WHERE id = ?', [id]);
        if(aviso.length > 0){
            return res.json(aviso);
        }
        res.status(404).json({text: "Aviso no encontrado"});
    }
}

export const avisosController = new AvisosController();  