import { Router } from "express";
import { loginSchema } from "../schemas/authSchema.js";

const router = Router();

const validUser = {
  id: 1,
  name: "Polly",
  username: "admin",
  password: "123456"
};

router.post("/login", (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);

    if (
      data.username !== validUser.username ||
      data.password !== validUser.password
    ) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    return res.json({
      id: validUser.id,
      name: validUser.name,
      username: validUser.username
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
