import User from "../models/UserModel.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username
  },
  process.env.JWT_SECRET, 
  {
      expiresIn: "7d"

  })
}

export const register = async (req, res) => {
    const {username, password, confirmPassword} = req.body;

    if(password != confirmPassword){
        return res.status(400).json({message: "Password do not match"})
    } 

    const existingUser = await User.findOne({where: {username: username}})
    if(existingUser) return res.status(400).json({message: "Username already exists."})

    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            username: username,
            password: hashPassword
        })
        

        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        res.status(400).json({msg: "Registration failed"})
        
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({where: {username: username}});
        if(!user) return res.status(400).json({message: "Invalid credentials"})
        
        const isMatch = await argon2.verify(user.password, password)
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})
        

        const token = generateToken(user);
        res.json({message: "Login successful", token})



    } catch (error) {
        res.status(400).json({message: "Login failed"})
        
    }

}
export const getUser = async (req, res) => {
    try { 
        const users = await User.findAll();

        res.status(200).json(users);

    } catch(error){
        res.status(500).json({error: error.message})

    }
}
