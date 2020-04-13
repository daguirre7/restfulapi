import express,{Application}from "express";

import {Maincontroller}from "./controllers/main.controller"

import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";


import { config } from "dotenv";
import { resolve } from "path";
config({path:resolve(__dirname,"../.env")});

class App{
    public app:Application;
    public mainController: Maincontroller;
    constructor(){
        this.app =express();
        this.setConfig();   
        this.setMongoDBConfig();
        this.mainController= new Maincontroller(this.app);
    }
    private setConfig(){
        this.app.use(bodyParser.json({limit:"50mb"}));
        this.app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))
    }
    //Configuracion propia de MongoDB
    private setMongoDBConfig(){
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGO_URI!,{useNewUrlParser:true, useUnifiedTopology:true},(err:any)=>{
            if(err){
                console.log(err.messsage);
            }else{
                console.log("Conexion exitosa");
            }        
        });
    }
}

export default new App().app;