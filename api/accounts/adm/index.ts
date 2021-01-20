import express = require('express');
import cookie = require('cookie');
import {AdmUsersHandler} from '../../../domain/handlers/users';


export default async function getUsers(req: express.Request,res: express.Response){
   
    const handler = new AdmUsersHandler();
    //console.log(req.body)
    const response = await handler.listUsers(req)

    

    res.status(response.code).json(response.data)

}

export  async function updateUser(req: express.Request,res: express.Response){
   
    const handler = new AdmUsersHandler();
    //console.log(req.body)
    const response = await handler.updateUser(req)

    

    res.status(response.code).json(response.data)
}

export  async function changeUserPassword(req: express.Request,res: express.Response){
   
    const handler = new AdmUsersHandler();
    //console.log(req.body)
    const response = await handler.changeUserPassword(req)

    

    res.status(response.code).json(response.data)

}


export  async function deleteUser(req: express.Request,res: express.Response){
   
    const handler = new AdmUsersHandler();
    //console.log(req.body)
    const response = await handler.deleteUser(req)

    

    res.status(response.code).json(response.data)

}