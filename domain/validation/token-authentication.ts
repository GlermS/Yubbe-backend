const jwt = require('jsonwebtoken');
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
       //console.log(req.headers)
        try{

            var data = jwt.verify(req.headers.authtoken,process.env.AUTHENTICATION_KEY) as {[key: string]:string}
            //console.log(data)
            return new User(true, data.name, data.id, data.authorization)
        }catch(error){
            //console.log(error)
            return new User(false, "", "", "")
        }  
    }
}

export default TokenAuthenticator