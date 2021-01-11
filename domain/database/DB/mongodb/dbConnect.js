const mongoose = require('mongoose');

const connection = {};

async function dbConnect(){
  //console.log("Iniciando conexão")
    if(connection.isConnected){
        return;
    }//process.env.MONGO_URI
    const db = await mongoose.connect("mongodb://localhost:27017/Yubbe", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then((connection) => {
        //console.log('Sucesso')
        connection.isConnected= connection.connections[0].readyState;
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
        })
}

module.exports = dbConnect;