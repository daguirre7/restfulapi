import app from "./app";
import {config} from "dotenv";
import {resolve} from "path";

config({path:resolve(__dirname,"../../.env")});

app.listen(3000, ()=>{
    console.log("server web prendido en el puerto 3000");
});