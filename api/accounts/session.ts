import express = require('express');
import TokenAuthenticator from '../../domain/validation/token-authentication';

export default async (req: express.Request,res: express.Response)=>{
    const authenticator = new TokenAuthenticator();
    
    const respo = await authenticator.verifyToken(req)
    //console.log(req.headers.authtoken)

    if (respo.approved){
        res.status(200).json(respo)
    }else{
        res.status(401).json(respo)
    }
}