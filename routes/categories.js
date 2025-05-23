import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";

const prisma = new PrismaClient();
const router = Router();

router.get("/:catId/lines", async (req, res) => {
  // Liste de toutes les lignes dont l'id de categorie correspond a :id
  try {
    const lines = await prisma.line.findMany({
      where: {
        categoryId: parseInt(req.params.catId),
      },
    });
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lines", message: error });
  }
});

router.get("/:catId/lines/:lineId", async (req, res) => {
  // Détails sur la ligne :id de la catégorie :id (creation date, premiere rame, derniere rame, arrêts dans l'ordre)
  try {
    const lines = await prisma.line.findFirstOrThrow({
      where: {
        id: parseInt(req.params.lineId),
        categoryId: parseInt(req.params.catId),
      },
    });
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lines", message: error });
  }
});

router.get("/:catId/lines/:lineId/stops", async (req, res) => {
  // Liste détaillée des arrêts de la ligne :id de la catégorie :id (nom, lat et long, ordre d'apparition sur la ligne)
  try {
    const lines = await prisma.stop.findMany({
      where: {
        lineId: parseInt(req.params.lineId),
        Line: {
          categoryId: parseInt(req.params.catId),
        },
      },
      orderBy: {
        order: "asc",
      },
    });
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lines", message: error });
  }
});

router.post(
  "/:catId/lines/:lineId/stops",
  [
    body("name").isString().exists(),
    body("order").isInt({ min: 1 }).exists(), // Validation pour que l'order soit strictement positif
    body("lat").isFloat().exists(),
    body("long").isFloat().exists(),
  ],
  async (req, res) => {
    // Valider les données
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { name, order, lat, long } = req.body;
    const lineId = parseInt(req.params.lineId);

    // Vérifier le nombre total d'arrêts pour cette ligne
    const totalStops = await prisma.stop.count({
      where: {
        lineId: lineId,
      },
    });

    // Si l'ordre est supérieur au nombre total d'arrêts, on place l'arrêt à la fin
    const finalOrder = order > totalStops ? totalStops + 1 : order;

    // Vérifier si un arrêt avec l'ordre final existe déjà
    const existingStop = await prisma.stop.findFirst({
      where: {
        lineId: lineId,
        order: order,
      },
    });

    if (existingStop) {
      // Si un arrêt avec cet ordre existe, on décale les arrêts suivants
      await prisma.stop.updateMany({
        where: {
          lineId: lineId,
          order: { gte: finalOrder }, // Trouve tous les arrêts dont l'ordre est supérieur ou égal
        },
        data: {
          order: {
            increment: 1, // Incrémente l'ordre de tous ces arrêts
          },
        },
      });
    }

    // Créer un nouvel arrêt avec l'ordre final calculé
    await prisma.stop.create({
      data: {
        name,
        order: finalOrder,
        lineId,
        lat,
        long,
      },
    });

    res.status(200).json({ message: "Stop created" });
  }
);

export default router;
