const mongoose = require('mongoose')
const MongoClient = require('mongoose').MongoClient
require('dotenv').config()


mongoose.set('useFindAndModify', false)

exports.connnect = mongoose.connect(process.env.CONNECT_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true,},()=>{
      console.log('Connexion à MongoDB réussie !')
  })

  
 

  
