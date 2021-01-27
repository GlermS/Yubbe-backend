import express = require('express');
import ThemesHandler from '../../domain/handlers/theme';


export default async function getThemeInfo(req: express.Request,res: express.Response){
   
    const handler = new ThemesHandler();
    const response = await handler.getThemeInfo(req)

    res.status(response.code).json(response.data)

}

export  async function listThemes(req: express.Request,res: express.Response){
   
    const handler = new ThemesHandler();
    const response = await handler.listThemes(req)

    res.status(response.code).json(response.data)

}