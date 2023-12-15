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
    this.router.get(`${this.path}/:email`, this.findUser);
    this.router.get(this.path, this.getUsers);
    this.router.post(`${this.path}/:id`, this.editUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private async createUser(req: Request, res: Response){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!name || !email || !password){
      return res.status(400).json({message: "Preencha todos os campos"});
    }

    try{
      await db("users").insert({
        name : name,
        email : email,
        password: await Bcrypt.hashPassword(password),
      }).then( async () => {
        try{
          await db("users").where({email: email}).select("*").then( (user) => {
            return res.status(200).json({user : user[0]});
          });
        }
        catch(err){
          return res.status(400).json({message : "não foi possivel criar o usário"});
        }
      });

    }catch(err){
      console.log(err);
    }
  }

  private async findUser(req: Request, res: Response){
    try{
      const email = req.params.email;
      await db("users").where({email: email}).select("*").then( async () => {
        const emailExists = await db("users").where({email: email}).select("*");

        if(!emailExists){
          return res.status(400).json({message: "Email inexistente"});
        }else{
          return res.status(200).json({user : emailExists[0]});
        }
      });
    }
    catch(err){
      console.log(err);
    }
  }

  private async editUser(req: Request, res: Response){
    try{
      const name = req.body.name;
      const email = req.body.email;
      const id = req.params.id;

      const updateUser = await db("users").where({id:id}).update({name:name, email:email});
      if(!updateUser){
        return res.status(400).json({message : "Erro ao atualizar o usário"});
      }else{
        return res.status(200).json({message : "usário editado com sucesso"});
      }
    }
    catch(err){
      return res.status(400).json({message : "não foi possivel editar o usário"});
    }
  }

  private async deleteUser(req:Request, res:Response){
    try{
      const id = req.params.id;
      
      const deleteUser = await db("users").delete().where({id:id});
      if(!deleteUser){
        return res.status(400).json({message : "Erro ao deletar o usário"});
      }else{
        return res.status(200).json({message : "usário deletado com sucesso"});
      }
    }catch(err){
      return res.status(400).json({message : "não foi possivel deletar o usário", error: err});
    }
  }

  private async getUsers(req:Request, res:Response){
    try{
      const users = await db("users").select("*");
      return res.status(200).json({users});
    }catch(err){
      return res.status(400).json({message : "não foi possivel buscar os usários"});
    }
  }
}

export default UserController;