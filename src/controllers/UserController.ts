import { Request, Response } from "express";
import Controller from "./Controller";

const enviroment:string = "development";
import Knex from "knex";
import dbconfig from "../../knexfile";
const db = Knex(dbconfig[enviroment]);



import Bcrypt from "../Services/Bycript";

class UserController extends Controller{

  constructor(){
    super("/user");
  }

  protected initRoutes(): void {
    // this.router.get(this.path, async (req, res) => {
    //   res.send("ola");
    // }); exemplo de uso de rotas
    this.router.post(this.path, this.createUser);
  }

  private async createUser(req: Request, res: Response){
    const name_user = req.body.name;
    const email_user = req.body.email;
    const password_user = Bcrypt.hashPassword(req.body.password);

    try{
      const user = await db("users").insert({
        name_user,
        email_user,
        password_user
      });
      console.log("Usuário criado com sucesso");
      return res.send(user);
    }catch(err){
      console.log(err);
    }
  }
  
}

export default UserController;