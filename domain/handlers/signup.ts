import express =require("express");
import MongoDB from "../database/DB/mongodb/mongodb";
import * as jwt from 'jsonwebtoken'
import { UserInterface } from "../database/interface/database";

class SignupHandler{
    async createAccount(req: express.Request){
        const {name, email, password, authorization} =req.body;
        //console.log(authorization)
        const isOk = this.validateData(name, email, password, authorization)
        
        if (isOk){
            let db = new MongoDB();
            //console.log("Criado datbase")
            const resp = await db.createNewAccount(name, email, password, authorization).then((data:UserInterface)=>{
                //console.log(data)
                if (data.approved){//process.env.AUTHENTICATION_KEY
                    return {approved:true, name: data.name , authToken: jwt.sign({name:data.name, id: data.id, authorization: data.authorization}, process.env.AUTHENTICATION_KEY || '0000', {expiresIn:'1h'})}
                }else{
                    return {approved:false, name: '', authToken: '', message: 'Email já utilizado'}
                     }}
            ).catch((err)=>{
                return {approved:false, name:'', authToken: '', message:err.toString()}})
            //console.log(resp)
            return resp 
        }
    }
    validateData(name: string, email: string, password: string, authorization:string):boolean{
        return true;
    }
}
export default SignupHandler;