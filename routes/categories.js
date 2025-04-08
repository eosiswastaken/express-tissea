import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const router = Router();

router.get('/:catId/lines', async (req, res) => { // Liste de toutes les lignes dont l'id de categorie correspond a :id
  try {
    const lines = await prisma.line.findMany({
      where: {
        categoryId: req.params.catId
      }
    });
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lines' , message: error });
  }
});

router.get('/:catId/lines/:lineId', (req,res) => { // Détails sur la ligne :id de la catégorie :id (creation date, premiere rame, derniere rame, arrêts dans l'ordre)
  res.send(req.params.lineId)
})

router.get('/:catId/lines/:lineId/stops', (req,res) => { // Liste détaillée des arrêts de la ligne :id de la catégorie :id (nom, lat et long, ordre d'apparition sur la ligne)

})

router.post('/:catId/lines/:lineId/stops', (req,res) => { // Ajoute un arrêt pour la ligne précisée par :id sur la catégorie :id

})

router.get('/', (req,res) => {
  res.send("test")
})


export default router;
