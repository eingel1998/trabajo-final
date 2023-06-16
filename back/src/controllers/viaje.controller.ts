import { Request, Response } from "express";
import { where } from "sequelize/types";
import { Viajeros, } from "../models/Viajeros";

import { Viajes, ViajeI } from "../models/Viaje";

export class ViajeController {
    public async test(req: Request, res: Response) {
        try {
            res.send("hola, metodo test para Viaje");
        } catch (error) {}
    }
    public async getAllViajes(req: Request, res: Response) {
        try {
            const viajes: ViajeI[] = await Viajes.findAll(
                {
                    include:{
                        model: Viajeros,
                        as: 'viajeros',
                        attributes: ['nombreCliente']
                    }
                }
            ); // select * from clientes;
            res.status(200).json({ viajes });
        } catch (error) {}
    }
    public async getViajes(req: Request, res: Response) {
        const { id: idParam } = req.params
        try {
            const viaje: ViajeI | null = await Viajes.findOne({ 
                where: { 
                    id: idParam,
                } 
            });
            if (viaje) {
                res.status(200).json({ viaje });
            }else{
                res.status(404).json({ msg: "Viaje no encontrado" });
            }
        } catch (error) {}
    }
    public async createViajes(req: Request, res: Response) {
        try {
            let body: ViajeI | any = req.body;
            let viaje: ViajeI = await Viajes.create(body);
            res.status(200).json({ viaje });
        } catch (error) {}
    }
    public async updateViajes(req: Request, res: Response) {
        const { id:pk } = req.params;

        const {
            id,
            numeroPlazas,
            frv,
            idViajero,
        }=req.body

        try{
            let body: ViajeI = {
                numeroPlazas,
                frv,
                idViajero,
            }

            const viajeExist: ViajeI | null = await Viajes.findByPk(pk);

            if(!viajeExist) return res.status(500).json({msg:"El viajero no existe"})
            await Viajes.update(body, {
                where: {id:pk}
            });
        }catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
        const viajes: ViajeI | null = await Viajes.findByPk(pk);
        if(viajes) return res.status(200).json({viajes})
    }
    public async deleteViajes(req: Request, res: Response) {
        const { id:pk } = req.params;
        try {
            const VajerosExist: ViajeI | null = await Viajes.findByPk(pk);
            if(!VajerosExist) return res.status(500).json({msg:"El viaje no existe"})
            await Viajes.destroy({
                where:{id:pk}
            })
            res.status(200).json({msg:"viaje eliminado"})
        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }
}