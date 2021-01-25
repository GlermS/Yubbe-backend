const jwt = require('jsonwebtoken');
import { UserInterface, Response } from '../database/interface/database';

class User implements UserInterface{
    name:string;
    id:string;
    authorization:string;
    email:string;
    constructor(name, id, authorization){//(approved: boolean,name:string, id:string, authorization:string){
        this.name = name;
        this.id=id;
        this.authorization=authorization;
    }
}

interface UserShape{
    name: string,
    id: string,
    authorization: string,
}

class TokenAuthenticator {
    verifyToken(req):Response{
        try{
            var data = jwt.verify(req.headers.authtoken,process.env.AUTHENTICATION_KEY) as {[key: string]:string}
            return {code:202, data:new User(data.name, data.id, data.authorization)}
        }catch(error){
            return {code:401, data:new User("", "", "")}
        }}
    }       

export default TokenAuthenticator