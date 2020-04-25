import {Request,Response} from "express";
import {Producto, IProducto} from "../models/producto.model";

import { MongooseDocument } from "mongoose";

export class ProductoService{

    public GetProducto(req:Request,res:Response){
        Producto.findById(req.params.id).populate("proveedor").exec((err:Error,producto:IProducto)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(producto);
            }
            
        });
    }

}
