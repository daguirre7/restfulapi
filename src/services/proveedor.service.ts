//Logica de los CRUD
import {Request,Response} from "express";
import {Proveedor, IProveedor} from "../models/proveedor.model";
import {Producto, IProducto} from "../models/producto.model";
import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class ProveedorHelpers{

    GetProveedor(id_prov: string):Promise<IProveedor>{
        return new Promise<IProveedor>( (resolve)=>{
            Proveedor.findById(id_prov,(err:Error,proveedor:IProveedor)=>{
                if(err){
                    console.log(err);
                }
                resolve(proveedor);
            });
        });
    }

    NumberOfProductsBySupplier(prov: IProveedor): Promise<number>{
        return new Promise<number>( resolve => {
            Producto.aggregate([
                { "$match": {"proveedor": prov._id }}
            ],(err:Error, data:any)=>{
                resolve(data.length);
            })
        });
    }

 
}
export class ProveedorService extends ProveedorHelpers{

    public getAll(req: Request, res: Response){
        Proveedor.find({},(err: Error, proveedores: MongooseDocument)=>{
            if (err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedores);
        });
    }

/*     public getByID(req: Request, res: Response){
        Proveedor.findById(req.params.id_prov,(err: Error,proveedor:IProveedor)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedor? proveedor : {});
        });

    } */

    public async getByID(req: Request, res: Response){
        const my_prov = await super.GetProveedor(req.params.id_prov);
        res.status(200).send(my_prov);
    }

    public Update(req: Request, res: Response) {
        Proveedor.findByIdAndUpdate(req.params.id_prov,req.body,(err: Error, proveedor: any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedor ? {"Updated":true} : {"updated":false});   
        });
    }
/* 
    public Delete(req: Request, res: Response){
        Proveedor.findByIdAndDelete (req.params.id_prov,req.body,(err: Error, proveedor: any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedor ?  {"Updated":true} : {"updated":false});
        });
    }
 */

    public async Delete(req: Request, res: Response){

        const Prov = await super.GetProveedor(req.params.id_prov);
        const nproducts:number = Prov? await super.NumberOfProductsBySupplier(Prov) : 0;        

        if(nproducts > 0){
            res.status(200).json({"deleted":false,"message":`El proveedor ${req.params.id_prov} tiene ${nproducts} productos asociados`});
        }else{
            if(Prov == undefined){
                res.status(200).json({"deleted":false,"message":`El proveedor ${req.params.id_prov} No existe`});         
            }else{
                Proveedor.findByIdAndDelete(req.params.id_prov,req.body,(err:Error, proveedor:any)=>{
                    if(err){
                        res.status(401).send(err);
                    }
                    res.status(200).json( proveedor? {"deleted":true, "message":"Sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
                });    
            }
        }        
    }
    public Nuevodato(req: Request, res: Response){
        const p = new Proveedor(req.body);
        p.save((err: Error, proveedor: IProveedor)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(Proveedor ? {"successed": true, "Proveedor": proveedor} : {"successed":false});
        });
    }
}

