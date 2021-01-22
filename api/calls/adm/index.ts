import express = require('express');
import {AdmCallsHandler} from '../../../domain/handlers/calls';

const callInfo = async (req: express.Request,res: express.Response)=>{
   
    const handler = new AdmCallsHandler();
    const respo = await handler.callInfo(req);

    res.status(respo.code).json(respo.data);
}

export default callInfo;

export async function editCall(req: express.Request,res: express.Response){
   
    const handler = new AdmCallsHandler();
    const respo = await handler.editCall(req);

    res.status(respo.code).json(respo.data);
}

export async function deleteCall(req: express.Request,res: express.Response){
   
    const handler = new AdmCallsHandler();
    const respo = await handler.deleteCall(req);

    res.status(respo.code).json(respo.data);
}

export async function addUserToCall(req: express.Request,res: express.Response){
   
    const handler = new AdmCallsHandler();
    const respo = await handler.addUserToCall(req);

    res.status(respo.code).json(respo.data);
}


export async function removeUserFromCall(req: express.Request,res: express.Response){
   
    const handler = new AdmCallsHandler();
    const respo = await handler.removeUserFromCall(req);

    res.status(respo.code).json(respo.data);
}

