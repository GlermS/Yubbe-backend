import express = require('express');
import LoginHandler from '../../domain/handlers/login';


export default async (req: express.Request,res: express.Response)=>{
   
    const handler = new LoginHandler();
    
    //console.log(req.body)
    const response = await handler.authenticateData(req)

    res.status(response.code).cookie('authToken',response.authToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge: 3600,
        path: '/'
    }).json({authToken:response.authToken})

}