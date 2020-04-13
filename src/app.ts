import express,{Application}from "express";

import {Maincontroller}from "./controllers/main.controller"

import bodyParser from "body-parser";
import cors from "cors";

class App{
    public app:Application;
    public mainController: Maincontroller;
    constructor(){
        this.app =express();
        this.setConfig();   
        this.mainController= new Maincontroller(this.app);
    }
    private setConfig(){
        this.app.use(bodyParser.json({limit:"50mb"}));
        this.app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))
    }
}

export default new App().app;