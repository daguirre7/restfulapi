//Definiendo las Rutas
import {Application} from "express";
import {ProveedorService} from "../services/proveedor.service";
//import { Proveedor } from "../models/proveedor.model";

export class ProveedorController{
    private prov_service: ProveedorService;
    constructor(private app: Application){
        this.prov_service = new ProveedorService();
        this.routes();
    }
    private routes(){
        this.app.route("/proveedors").get(this.prov_service.getAll);

    }
}