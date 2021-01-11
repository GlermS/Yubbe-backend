import jwt = require('jsonwebtoken');
import { UserInterface } from '../database/interface/database';

class User implements UserInterface{
    approved: boolean;
    name:string;
    id:string;
    authorization:string;
    constructor(approved, name, id, authorization){//(approved: boolean,name:string, id:string, authorization:string){
        this.approved=approved
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
    verifyToken(req):UserInterface{
        console.log(req)
        try{//process.env.AUTHENTICATION_KEY
            var data = jwt.verify(req.cookies.authtoken, 'ANAPIENAPWIEHAEPFAPEFAÇENFAJEJFNLALMALMFWEMWK') as {[key: string]:string}
            return new User(true, data.name, data.id, data.authorization)
        }catch(error){
            return new User(false, "", "", "")
        }  
    }
}

export default TokenAuthenticator