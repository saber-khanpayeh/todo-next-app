import NextAuth from "next-auth";
import connectDB from "../../../utils/connectDB";
import User from "../../../model/User";
import { verifyPassword } from "../../../utils/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB!");
        }

        if (!email || !password) {
          throw new Error("Invalid Data!");
        }

        const user = await User.findOne({ email: email });

        if (!user) throw new Error("User doesn't exist!");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new Error("Username or password is incorrect!");

        return { email };
      },
    }),
  ],
};
export { authOptions };
export default NextAuth(authOptions);
