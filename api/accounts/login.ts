import express = require('express');
import cookie = require('cookie');
import LoginHandler from '../../domain/handlers/login';


export default async (req: express.Request,res: express.Response)=>{
   
    const handler = new LoginHandler();
    //console.log(req.body)
    const response = await handler.authenticateData(req)

    if(response.approved){
        res.status(200)
    }else{
        res.status(401)
    }

    res.cookie('authToken',response.authToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge: 3600,
        path: '/'
    }).json(response)

}