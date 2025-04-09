import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const prisma = new PrismaClient();
const router = Router();

function generateAccessToken(hash) {
  return jwt.sign(hash, process.env.TOKEN_SECRET);
}
router.post(
  "/signup",
  [
    body("name").isString().exists(),
    body("email").isEmail().exists(),
    body("password").isString().exists(),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ errors: err.array() });
    }

    const requestedUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (requestedUser) {
      res.status(400).json({ message: "Email already used" });
      return;
    }
    let token = generateAccessToken(req.body.name);

    res
      .status(200)
      .json({ message: "Account successfully created", token: token });

    await prisma.user.createMany({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: crypto
          .createHash("md5")
          .update(req.body.password)
          .digest("hex"),
      },
    });
  }
);

router.post(
  "/login",
  [body("email").isEmail().exists(), body("password").isString().exists()],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ errors: err.array() });
    }

    const requestedUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!requestedUser) {
      res.status(400).json({ message: "Bad email" });
      return;
    }

    if (
      requestedUser.password ===
      crypto.createHash("md5").update(req.body.password).digest("hex")
    ) {
      let token = generateAccessToken(requestedUser.name);
      res.status(200).json({ message: "Successfully logged in", token: token });
    } else {
      res.status(400).json({ message: "Bad password" });
    }
  }
);
export default router;
