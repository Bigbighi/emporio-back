import {Router} from "express";

abstract class Controller{
  protected path:string;
  public router:Router;

  constructor(path:string){
    /*
      Aqui segue uma lógica para abrigar todas as rotas da aplicação.
      no modelo classe Pai e classe filha.
    */
    this.router = Router();
    this.path = path;

    setTimeout(() => {
      //Aqui pega as routas e usa-se essa lógica devido ao tempo de vida do typescript.
      this.initRoutes();
    }, 0);
  }

  protected abstract initRoutes():void;
}

export default Controller;