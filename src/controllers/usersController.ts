import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../database';

const SECRET_KEY= '$3cr37k3y$$4';

class UsersController {
    public async index (req : Request, res : Response) : Promise<any>{
        const users = await pool.query('SELECT * FROM USERS WHERE puesto IS NULL OR puesto = \'\'');
        const personal = await pool.query('SELECT * FROM USERS WHERE puesto <> NULL OR puesto <> \'\'');
        res.json([users,personal]);
    }

    public async create(req : Request, res : Response) : Promise<void>{
        await pool.query('INSERT INTO USERS SET ?', [req.body]);
        res.json({message : "El usuaro ha sido insertado"});
    }

    public async update(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE USERS SET ? WHERE id = ?', [req.body,id]);
        res.json({message : "El usuaro ha sido actualizado"});
    }

    public async delete(req : Request, res : Response) : Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM USERS WHERE id = ?', [id]);
        res.json({message : "El usuario ha sido eliminado"});
    }

    public async view(req : Request, res : Response) : Promise<any>{
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM USERS WHERE id = ?', [id]);
        if(user.length > 0){
            return res.json(user);
        }
        res.status(409).json({text: "Usuario no encontrado"});
    }

    public async login(req : Request, res : Response) : Promise<any>{
        const { id } = req.body;
        const { password } = req.body;
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: id }, SECRET_KEY, { expiresIn: expiresIn });
        const user = await pool.query('SELECT * FROM USERS WHERE id = ? AND password = ?', [id,password]);
        if(user.length > 0){
            const userData = {
                id: id,
                rol: user[0].rol,
                accessToken: accessToken,
                expiresIn: expiresIn
            };
            return res.json({userData: userData});
        }
        res.status(409).json({message: "Usuario no registrado"});
    }

    public async userDetails(req : Request, res : Response) : Promise<any>{
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM PAGOS WHERE Users_id = ?', [id]);
        if(user.length > 0){
            return res.json(user);
        }
        res.status(409).json({text: "Sin datos encontrados"});
    }

    public async users (req : Request, res : Response) : Promise<any>{
        const users = await pool.query('SELECT * FROM USERS');
        res.json(users);
    }

}

export const usersController = new UsersController();  