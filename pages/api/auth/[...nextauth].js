import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import bcrypt from 'bcrypt'
connectDB()
export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.ACCESS_TOKEN_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
  },
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
    async jwt(token, user, account) {
      if (user) {
        const existingUser = await User.findOne({ email: user.email });
        const passwordHash = await bcrypt.hash("user123", 12)
        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            password: passwordHash
          });
          await newUser.save();
        }
      }
      return Promise.resolve(token);
    },
  }
});
