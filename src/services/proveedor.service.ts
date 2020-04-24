//Logica de los CRUD
import {Request,Response} from "express";
import {Proveedor, IProveedor} from "../models/proveedor.model";
import { MongooseDocument } from "mongoose";

export class ProveedorService{

    public getAll(req: Request, res: Response){
        Proveedor.find({},(err: Error, proveedores: MongooseDocument)=>{
            if (err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedores);
        });
    }

    public getByID(req: Request, res: Response){
        Proveedor.findById(req.params.id_prov,(err: Error,proveedor:IProveedor)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedor? proveedor : {});
        });

    }

    public Update(req: Request, res: Response) {
        Proveedor.findByIdAndUpdate(req.params.id_prov,req.body,(err: Error, proveedor: any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedor ? {"Updated":true} : {"updated":false});   
        });
    }
}

