import express = require('express');
import TokenAuthenticator from "../validation/token-authentication";
import MongoDB from "../database/DB/mongodb/mongodb";

export default class ThemesHandler{
    code = {authorized:200}

    getThemeInfo = async (req:express.Request)=>{
            const auth = this.authenticateData(req)
            if(auth.code===this.code.authorized){
                const db = new MongoDB()
                const respo =  await db.getThemeInfo(auth.data.id, req.query.id)
                return respo
            }else{
                return {code: 401, data: "Not allowed"}
            }
        }

    listThemes = async (req:express.Request)=>{
        const auth = this.authenticateData(req)
        if(auth.code===this.code.authorized){
            const db = new MongoDB()
            const respo =  await db.listThemes()
            return respo
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    authenticateData(req: express.Request){
        const authenticator = new TokenAuthenticator();
        return authenticator.verifyToken(req)
    }
}

export class AdmThemesHandler{
    code = {authorized:200}

    createTheme = async (req:express.Request)=>{
            const auth = this.authenticateData(req)
            if(auth.code===this.code.authorized){
                const db = new MongoDB()
                const respo =  await db.admCreateTheme(auth.data.id,req.body)
                return respo
            }else{
                return {code: 401, data: "Not allowed"}
            }
        }
    
    updateTheme = async (req:express.Request)=>{
        const auth = this.authenticateData(req)
        if(auth.code===this.code.authorized){
            const db = new MongoDB()
            const respo =  await db.admUpdateTheme(auth.data.id,req.query.id,req.body)
            return respo
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    authenticateData(req: express.Request){
        const authenticator = new TokenAuthenticator();
        return authenticator.verifyToken(req)
    }
}