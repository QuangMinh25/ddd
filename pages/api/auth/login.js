import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            // check if it's a Google login request
            if(req.body.method === 'google'){
                await googleLogin(req, res)
            } else {
                await login(req, res)
            }
            break;
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await Users.findOne({ email })
        if(!user) return res.status(400).json({err: 'This user does not exist.'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({err: 'Incorrect password.'})

        const access_token = createAccessToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})

        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const googleLogin = async (req, res) => {
    try{
        const { email, name, avatar, googleId, role } = req.body

        // check if user already exists in database
        let user = await Users.findOne({ email })

        if(!user){
            // create new user in database
            const password = email + process.env.GOOGLE_SECRET
            const hash_password = await bcrypt.hash(password, 12)

            user = await Users.create({
                name,
                email,
                password: hash_password,
                avatar,
                role: 'user' // Set default user role
            })
        }

        // generate tokens with user id and role
        const access_token = createAccessToken({ id: user._id, role: user.role })
        const refresh_token = createRefreshToken({ id: user._id })

        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })

    } catch(err){
        return res.status(500).json({err: err.message})
    }
}