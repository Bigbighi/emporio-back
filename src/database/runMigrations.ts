const enviroment:string = "development";
import dbconfig from "../../knexfile";
import Knex from "knex";
const db = Knex(dbconfig[enviroment]);

const runMigrations = async () => {
  try {
    await db.migrate.latest();
  } catch (error) {
    console.log("error", error);
    throw new Error("database conection failure");
  } finally {
    await db.destroy();
  }
};
  
export default runMigrations;