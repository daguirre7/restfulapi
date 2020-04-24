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
        this.app.route("/proveedores").get(this.prov_service.getAll);
        //this.app.route("/proveedor/:id_prov").get(this.prov_service.getByID);
        //this.app.route("/proveedor/:id_prov").put(this.prov_service.Update);
        //Resumiendo codigo....
        this.app.route("/proveedor/:id_prov")
        .get(this.prov_service.getByID)
        .put(this.prov_service.Update);
    }
}