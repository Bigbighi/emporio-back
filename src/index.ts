import Application from "./Application";
import UserController from "./controllers/UserController";
import runMigrations from "./database/runMigrations";

const app = new Application([
  new UserController(),
]);

runMigrations().then(() => {

  try{
    app.listen(3000);
  }catch(err){
    console.log(err);
  }
}
);