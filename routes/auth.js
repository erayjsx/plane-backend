import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const { sign } = jwt;

const router = Router();

// kullanıcı kayıt olma
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kullanıcı giriş yapma
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res
      .status(401)
      .json({ message: "Geçersiz kullanıcı adı veya şifre" });
  }
  const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

export default router;
