import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma/prisma.js";
import { JwtPayload as JWT } from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

interface JwtPayload extends JWT {
  userId: number;
  role: "OWNER" | "WALKER" | "ADMIN";
}

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "OWNER" | "WALKER" | "ADMIN";
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

router.post("/register", async (req: RegisterRequest, res: Response) => {
  console.log(req.body);
  const { email, password, role, firstName, lastName } = req.body;

  // Check if a user with the given email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: "A user with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role, firstName, lastName },
  });
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
});

router.post("/login", async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
});

router.post("/verify-token", (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export const getUserFromToken = async (token: string) => {
  // remove bearer from token
  token = token.split(" ")[1];
  try {
    const payload: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return await prisma.user.findUnique({ where: { id: payload.userId } });
  } catch (err) {
    return null;
  }
};

export default router;
