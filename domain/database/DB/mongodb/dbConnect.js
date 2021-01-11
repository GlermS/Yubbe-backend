const mongoose = require('mongoose');

const connection = {};

async function dbConnect(){
  //console.log("Iniciando conexão")
    if(connection.isConnected){
        return;
    }//
    const url = process.env.MONGO_URI || "mongodb+srv://backendYubbe:back49for007@yubbe.gjqnu.mongodb.net/Yubbe?retryWrites=true&w=majority"
    const db = await mongoose.connect(url, {connectTimeoutMS:1000,useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then((connection) => {
        console.log('Sucesso')
        connection.isConnected= connection.connections[0].readyState;
      })
      .catch(error => {
        console.error('Error connecting to database');
        //return process.exit(1);
        })
}

module.exports = dbConnect;