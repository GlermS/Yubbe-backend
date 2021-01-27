import express = require('express');
import {AdmThemesHandler} from '../../../domain/handlers/theme';


export default async function createTheme(req: express.Request,res: express.Response){
   
    const handler = new AdmThemesHandler();
    const response = await handler.createTheme(req)

    res.status(response.code).json(response.data)

}

export async function updateTheme(req: express.Request,res: express.Response) {
    const handler = new AdmThemesHandler();
    const response = await handler.updateTheme(req)

    res.status(response.code).json(response.data)
}