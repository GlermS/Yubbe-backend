import express = require('express');
import cookie = require('cookie');
import LoginHandler from '../../domain/handlers/login';


export default async (req: express.Request,res: express.Response)=>{
   
    const handler = new LoginHandler();
    
    const respo = await handler.authenticateData(req)

    res.setHeader('Set-Cookie', cookie.serialize('authToken',respo.authToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge: 3600,
        path:'/'
    }))
    const response ={
        approved:respo.approved,
        name: respo.name
    }

    if(response.approved){
        res.status(202)
    }else{
        res.status(401)
    }
    res.json(response)

}