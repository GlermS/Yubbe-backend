
import express = require('express');
import cookie = require('cookie');

export default (req: express.Request, res: express.Response)=>{
    res.setHeader('Set-Cookie', cookie.serialize('authToken','',{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge: 3600,
        path:'/'
    }))
    res.setHeader("Access-Control-Allow-Origin", "*")

    res.redirect('/')
}