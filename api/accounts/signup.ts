import express = require('express');
import cookie = require('cookie');
import SignupHandler from '../../domain/handlers/signup';


export default async (req: express.Request,res: express.Response)=>{
    const handler = new SignupHandler();
    
    const respo = await handler.createAccount(req)
    
    const response ={
        approved:respo.approved,
        name: respo.name
    }

    if(response.approved){
        res.status(201);
    }else{
        res.status(401)
    }

    res.setHeader('Set-Cookie', cookie.serialize('authToken',respo.authToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge: 3600,
        path:'/'
      }))
    res.json(response);
}