import express = require('express');
import TokenAuthenticator from "../validation/token-authentication";
import MongoDB from "../database/DB/mongodb/mongodb";

export class AdmUsersHandler{
    code = {authorized:200}

    listUsers = async (req:express.Request)=>{
            const auth = this.authenticateData(req)
            if(auth.code===this.code.authorized){
                const db = new MongoDB()
                const respo =  await db.listUsers(auth.data.id)
                return respo
            }else{
                return {code: 401, data: "Not allowed"}
            }
        }

    updateUser = async (req:express.Request)=>{
        const auth = this.authenticateData(req)
        const userData = req.body.userData
        if(auth.code===this.code.authorized){
            const db = new MongoDB()
            var user ={"id":userData.id}
            if(userData.name){
                user['name'] = userData.name
            }
            if(userData.email){
                user['email'] = userData.email
            }
            if(userData.weeklyLimit){
                user['weeklyLimit'] = userData.weeklyLimit
            }
            if(userData.authorization){
                if(['adm','moderator','client'].includes(userData.authorization)){
                    user['authorization']=userData.authorization
                }
            }
            const respo =  await db.admUpdateUser(auth.data.id, user)
            return respo
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }
    
    changeUserPassword = async (req:express.Request)=>{
        const auth = this.authenticateData(req)
        const userData = req.body.userData
        
        if(auth.code===this.code.authorized){
            const db = new MongoDB()
            const respo =  await db.admUpdateUserPassword(auth.data.id, userData.id, userData.password)
            return respo
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    deleteUser = async (req:express.Request)=>{
        const auth = this.authenticateData(req)

        if(auth.code===this.code.authorized){
            const db = new MongoDB()
            const respo =  await db.admDeleteUser(auth.data.id,req.body.userId)
            return respo
        }else{
            return {code: 401, data: "Not allowed"}
        }
    }

    checkEmail = async (req:express.Request)=>{
        const auth = this.authenticateData(req)
        
        if(auth.code===this.code.authorized){
            const db = new MongoDB()
            const respo =  await db.admCheckEmail(auth.data.id,req.query.email)
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