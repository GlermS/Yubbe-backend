import express = require('express');
import TokenAuthenticator from '../../domain/validation/token-authentication';

export default async (req: express.Request,res: express.Response)=>{
    const authenticator = new TokenAuthenticator();
    
    const respo = await authenticator.verifyToken(req)
    
    res.status(respo.code).json(respo.data)
}