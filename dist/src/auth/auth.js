import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";
router.post("/register", async (req, res) => {
    console.log(req.body);
    const { email, password, role, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, role, firstName, lastName },
    });
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
});
router.post("/verify-token", (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        res.json({ user });
    }
    catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
});
export const getUserFromToken = async (token) => {
    // remove bearer from token
    token = token.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return await prisma.user.findUnique({ where: { id: payload.userId } });
    }
    catch (err) {
        return null;
    }
};
export default router;
