import express = require('express');
import cookie = require('cookie');
import TokenAuthenticator from '../../domain/validation/token-authentication';

export default async function Token(req: express.Request,res: express.Response){
    const authenticator = new TokenAuthenticator();
    
    const respo = await authenticator.verifyToken(req)
    
    if (respo.approved){
        res.status(201).json(respo)
        
    }else{
        res.status(401)
        /*
        res.setHeader('Set-Cookie', cookie.serialize('authToken','',{
            httpOnly:true,
            secure:process.env.NODE_ENV!=='development',
            sameSite:'strict',
            maxAge: 3600,
            path:'/'
        }))*/
        res.json(respo)
    }
}