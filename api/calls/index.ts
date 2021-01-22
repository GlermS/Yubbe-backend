import express = require('express');
import CallsHandler from '../../domain/handlers/calls';

const listCalls = async (req: express.Request,res: express.Response)=>{
   
    const handler = new CallsHandler();
    const respo = await handler.listCalls(req);

    res.status(respo.code).json(respo.data);
}

export default listCalls;

export async function createCall(req: express.Request,res: express.Response){
    console.log(req.body)
    const handler = new CallsHandler();
    const respo = await handler.createCall(req);

    res.status(respo.code).json(respo.data);
}


export async function joinCall(req: express.Request,res: express.Response){
   
    const handler = new CallsHandler();
    const respo = await handler.joinCall(req).catch(console.log);
    console.log(respo)
    res.status(respo.code).json(respo.data);
}

export async function moderateCall(req: express.Request,res: express.Response){
   
    const handler = new CallsHandler();
    const respo = await handler.moderateCall(req).catch(console.log);

    res.status(respo.code).json(respo.data);
}

export async function listUsersCall(req: express.Request,res: express.Response){
   
    const handler = new CallsHandler();
    const respo = await handler.listUsersCalls(req)//.catch(console.log);

    res.status(respo.code).json(respo.data);
}