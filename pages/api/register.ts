import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request is a POST
  if (req.method === "POST") {
    // Check if the email and password are provided
    try {
      const { email, name, password } = req.body;
      const exisingUser = await prismadb.user.findUnique({
        where: {
          email,
        },
      });
      if (exisingUser) {
        return res.status(422).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await prismadb.user.create({
        data: {
          email,
          name,
          hashedPassword,
          image: "",
          emailVerified: new Date(),
        },
      });
      return res.status(201).json({ message: "User created", user });
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  } else {
    return res.status(405).end();
  }
}
