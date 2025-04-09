import express from "express";
import statsRoutes from "./routes/stats.js";
import categoriesRoutes from "./routes/categories.js";
import userRoutes from "./routes/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";

dotenv.config();
console.log(process.env.TOKEN_SECRET);
const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.get("/g", (req, res) => {
  res.send("Hello World");
});

app.put(
  "/api/categories/:catId/lines/:lineId",
  [
    body("name").isString(),
    body("color").isString(),
    body("categoryId").isInt(),
    body("firstDeparture").isString(),
    body("lastDeparture").isString(),
  ],
  async (req, res) => {
    // Mettre à jour une ligne
    const { name, color, categoryId, firstDeparture, lastDeparture } = req.body;

    try {
      const updatedLine = await prisma.line.update({
        where: {
          id: parseInt(req.params.lineId),
        },
        data: {
          name,
          color,
          categoryId,
          firstDeparture,
          lastDeparture,
        },
      });
      res.json(updatedLine);
    } catch (error) {
      res.status(500).json({ error: "Failed to update line", message: error });
    }
  }
);

app.delete(
  "/api/categories/:catId/lines/:lineId/stops/:stopOrder",
  async (req, res) => {
    const { stopOrder, lineId } = req.params;
    console.log(stopOrder, lineId);

    const stop = await prisma.stop.findFirst({
      where: {
        lineId: parseInt(lineId),
        order: parseInt(stopOrder),
      },
    });

    if (!stop) {
      return res.status(404).json({ message: "Stop not found" });
    }

    if (stop.lineId !== parseInt(lineId)) {
      return res
        .status(400)
        .json({ message: "Stop does not belong to this line" });
    }

    await prisma.stop.delete({
      where: { order: parseInt(stopOrder), id: stop.id },
    });

    await prisma.stop.updateMany({
      where: {
        lineId: parseInt(lineId),
        order: { gte: stop.order },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    res.status(200).json({ message: "Stop deleted and orders adjusted" });
  }
);

app.use("/api/stats", authenticateToken, statsRoutes);
app.use("/api/categories", authenticateToken, categoriesRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
