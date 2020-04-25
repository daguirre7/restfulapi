import mongoose from "mongoose"
import { IProveedor } from "./proveedor.model";

export interface IProducto extends mongoose.Document{
    name: String;
    precio_compra: number;
    precio_venta: number;
    cantidad: number;
    proveedor: IProveedor;
}

const ProductoSchema= new mongoose.Schema({
    //_id: {type: String, required: true},
    name: {type: String, required: true},
    precio_compra: {type: Number, required: true},
    precio_venta: {type: Number, required: true},
    cantidad: {type: Number, required:true},
    proveedor: {type: mongoose.Schema.Types.ObjectId, ref:"Proveedor"}
});
    
export const Producto = mongoose.model<IProducto>("Producto",ProductoSchema);