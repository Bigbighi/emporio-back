import bcrypt from "bcrypt";

class Bcrypt {
  private static saltRounds: number = 10;

  public static async hashPassword(password: string): Promise<string> {
    try {
      const hash: string = await bcrypt.hash(password, Bcrypt.saltRounds);
      return hash;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public static async comparePassword(password:string, hash:string):Promise<boolean>{
    try{
      const result:boolean = await bcrypt.compare(password, hash);
      return result;
    }
    catch(err){
      console.error(err);
      throw err;
    }
  }
}

export default Bcrypt;
