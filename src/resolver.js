const  Thing  = require("./models/thing")
const User = require("./models/user")
const  bcrypt = require("bcryptjs")
const jsonWebToken = require('jsonwebtoken')
require ('dotenv').config()

const salt = bcrypt.genSaltSync(10);


exports.resolvers = {
    Query:{
        things: () => Thing.find(),
        
        user:  async (root, args, { user }) => {
            try {
              if(!user) throw new Error('You are not authenticated!')
              return User.findById(args.id);
            } catch (error) {
              throw new Error(error.message)
            }
        },

        allUsers: async (root, args, { user }) => {
            try {
              if (!user) throw new Error('You are not authenticated!')
              return User.find()
            } catch (error) {
              throw new Error(error.message)
            }
        },

        me : async (_, args, { user }) => {
            if(!user) throw new Error('You are not authenticated')
            return await User.findById(user.id)
        }

        
    },
    Mutation:{
        createThing: async(_,args) => {
            const thing =  Thing.create({
                title: args.title,
                descripton: args.descripton,
                imageUrl: args.imageUrl,
                userId: args.userId,
                price: args.price
            });
            try{
                (await thing).save
                return  thing
            }catch(err){
                return err.message
            }
        },
        setThing: async(_,args) => {
            try{
                await Thing.findOneAndUpdate({
                    _id: args.id,
                    title: args.title,
                    descripton: args.descripton,
                    imageUrl: args.imageUrl,
                    userId: args.userId,
                    price: args.price
                });              
                return true
            }catch(err){
                return false
            }
        },
        deleteThing: async(_,args) => {
            try{
                await Thing.findOneAndDelete({_id : args.id});
                return true;
            }catch(err){
                return false;
            }
        },

//------------------------USER MUTATIONS-----------------------
        registerUser: async (_, args) => {
            try {
              const user = await User.create({
                username : args.username,
                email : args.email,
                password : await bcrypt.hash(args.password, 10)
              })
              const token = jsonWebToken.sign(
                { id: user.id, username: user.username},
                process.env.JWT_SECRET,
                { expiresIn: '1y'}
              )
              await user.save()
              return {
                token,
                user
              }
            } catch (error) {
              return error.message
            }
          },
        /*setUser: async(_,args) => {
            try{
                await User.findOneAndUpdate({
                _id: args.id,
                username : args.username,
                email : args.username,
                password : bcrypt.hashSync(args.password,salt)  
                });              
                return true
            }catch(err){
                return false
            }
        },
        deleteUser: async(_,args) => {
            try{
                await User.findOneAndDelete({_id : args.id});
                return true;
            }catch(err){
                return false;
            }
        
        },*/
        login: async (_, args) => {
            try {
              const user = await User.findOne({ username: args.username })
              if (!user) {
                throw new Error('No user with that username')
              }
              const isValid = await bcrypt.compare(args.password, user.password)
              if (!isValid) {
                throw new Error('Incorrect password')
              }
              // return jwt
              const token = jsonWebToken.sign(
                { id: user.id, username: user.username},
                process.env.JWT_SECRET,
                { expiresIn: '1d'}
              )
              return {
               token, user
              }
          } catch (error) {
            return error
          }
        }
    }
}

