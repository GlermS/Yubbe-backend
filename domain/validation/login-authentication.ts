import jwt = require('jsonwebtoken');
import MongoDB from "../database/DB/mongodb/mongodb";
import DataBaseInterface from "../database/interface/database";


class LoginAuthentication{
    constructor(){}
    verifyData = async (db: DataBaseInterface, email: string, password: string)=>{
        const data = await db.compareLoginData(email, password)
        return data;
    }

    async authenticate(email:string, password:string){
        let database = new MongoDB();

        const data = await this.verifyData(database, email, password);

        if (data.code===202){
            return {code:data.code, authToken: jwt.sign({name:data.data.name, id: data.data.id, authorization: data.data.authorization}, process.env.AUTHENTICATION_KEY, {expiresIn:'24h'})}
        }else{
            return {code:data.code, authToken: ''}
        }
    }

}

export default LoginAuthentication;