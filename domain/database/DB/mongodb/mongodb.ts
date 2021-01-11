const UserModel = require('./models/User')
const CallModel = require('./models/Call')

import dbConnect = require('./dbConnect')
import DataBaseInterface,{UserInterface} from '../../interface/database';
import {hash,compare} from 'bcrypt'

class User implements UserInterface{
    approved: boolean;
    name:string;
    id:string;
    authorization:string;

    constructor(approved: boolean,name:string, id:string, authorization:string){
        this.approved=approved
        this.name = name;
        this.id=id;
        this.authorization=authorization;
    }
}

class MongoDB implements DataBaseInterface{
    constructor(){

    }
    async compareLoginData(email: string, password: string){
        const conn = await dbConnect()
        const resp =await UserModel.find({email: email})
        try{
            const user = await compare(password, resp[0].password).then(isPasswordOk=>{
                if(isPasswordOk){
                    return new User(true, resp[0].name, resp[0].id, resp[0].authorization);
                }else{
                    return new User(false, '', '', '');
                }
            });
            return user;
        }catch(error){
            return new User(false, '', '', '')
        }
    }
    async createNewAccount(name:string, email: string, password: string, authorization: string):Promise<UserInterface>{
        //console.log("Entrou")
        dbConnect()
        //console.log("Criando conta")
       
        var user = await hash(password,12).then(async(hash)=>{
            //console.log(hash)
            const resp = await UserModel.create({name:name, email: email, password:hash,  authorization:authorization}).then(data=>{
                
                if(data!=undefined){
                    //console.log("User criado")
                    return new User(true, data.name, data.id, data.authorization)
                    }
                return new User(false, '', '', '')
                }).catch((err)=>{
                //console.log(err)
                return new User(false, '', '', '')
                 })
            //console.log("Resp")
            return resp
        })
        //console.log(user)
        return user;   
    }
    
    async listCalls(){
        dbConnect()
        const resp = await CallModel.find({}).then((data)=>{return data}).catch((err)=>{return {error: err.toString()}})
        return resp

    }


}

export default MongoDB;