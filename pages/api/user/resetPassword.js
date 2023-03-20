import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import auth from '../../../middleware/auth'
import bcrypt from 'bcrypt'




connectDB()

export default async(req, res) => {
    switch (req.method) {
        case "PATCH":
            await resetPassword(req, res)
            break;
    }
}
function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

const resetPassword = async(req, res) => {
    try {
        const result = await auth(req, res)
        const { password } = generateRandomPassword(8);
        const passwordHash = await bcrypt.hash(password, 12)

        await User.findOneAndUpdate({ _id: result.id }, { password: passwordHash })

        res.json({ msg: "Update Success!" })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}