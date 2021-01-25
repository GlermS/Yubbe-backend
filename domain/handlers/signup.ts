import express =require("express");
import MongoDB from "../database/DB/mongodb/mongodb";
import * as jwt from 'jsonwebtoken'
import Notification from '../notifications/mailer/send'
import { UserInterface } from "../database/interface/database";

class SignupHandler{
    async createAccount(req: express.Request){
        const {name, email, password} =req.body;
        const isOk = this.validateData(name, email, password, '')
        
        if (isOk){
            let db = new MongoDB();
            const resp = await db.createNewAccount(name, email, password).then((response)=>{
                if (response.data.approved){
                    const notification = new Notification()
                    notification.ConfirmSignup(response.data.email)

                    return {approved:true, code: response.code, name: response.data.name , authToken: jwt.sign({name:response.data.name, id: response.data.id, authorization: response.data.authorization}, process.env.AUTHENTICATION_KEY, {expiresIn:'1h'})}
                }else{
                    return {approved:false, code: response.code, name: '', authToken: '', message: 'Email já utilizado'}
                     }}
            ).catch((err)=>{
                return {approved:false, code: 401, name:'', authToken: '', message:err.toString()}})
            return resp 
        }
    }
    validateData(name: string, email: string, password: string, authorization:string):boolean{
        return true;
    }
}
export default SignupHandler;