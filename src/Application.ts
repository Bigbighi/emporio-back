import express from "express";
import cors from "cors";
import Controller from "./controllers/Controller";

const enviroment:string = "development";
import Knex from "knex";
import dbconfig from "../knexfile";
const db = Knex(dbconfig[enviroment]);



class Application{
  public app : express.Application;

  public constructor(controllers:Controller[]){
    //Configurações iniciais do servidor
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());

    //implementar conexeção com o banco
    this.initDB();
    this.initControllers(controllers);
  }

  private initControllers(controllers:Controller[]):void{
    controllers.forEach(controllers => {
      this.app.use("/", controllers.router);
    });
  }

  public listen(port:number):void{
    /*
      Inserir a porta no qual o servidor vai se conectar.
      Futuramente implementar o uso de váriaveis de ambiente.
    */
    this.app.listen(port, () => {
      
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  }

  public initDB():void{
    try{
      db.raw("select 1+1 as result").then(
        () => {
          console.log("Conectado ao banco de dados");
        }
      );
    }catch(err){
      console.log(err);
    }
  }
  
  
}

export default Application;