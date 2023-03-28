import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'
import { getSession } from 'next-auth/client';


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try{
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const { email, googleId } = session.user;

        const user = await Users.findOne({ email })
        console.log("hello"+user);
        if(!user) {
            // If user not found, check if user exists with Google ID
            const userWithGoogleId = await Users.findOne({ googleId });
            console.log("google ID "+userWithGoogleId);
            if (!userWithGoogleId) {
                return res.status(400).json({err: 'This user does not exist.'})
            } else {
                // If user exists with Google ID, use that account to log in
                const access_token = createAccessToken({id: userWithGoogleId._id})
                const refresh_token = createRefreshToken({id: userWithGoogleId._id})
        
                return res.json({
                    msg: "Login Success!",
                    refresh_token,
                    access_token,
                    user: {
                        name: userWithGoogleId.name,
                        email: userWithGoogleId.email,
                        role: userWithGoogleId.role,
                        avatar: userWithGoogleId.avatar,
                        root: userWithGoogleId.root
                    }
                })
            }
        }

        // If user exists with email, check password
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
