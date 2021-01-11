import express = require('express');
import CallsHandler from '../../domain/handlers/calls';

export default async (req: express.Request,res: express.Response)=>{
    const method = req.method
    switch (method){
        case 'GET':
            const handler = new CallsHandler();
            const respo = await handler.listCalls(req);

            res.json(respo);

    }
}