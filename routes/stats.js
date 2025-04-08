import { Router } from 'express';

const router = Router();

router.get('/distance/stops/:id/:id', (req, res) => {
  res.send('Hello World from stats!');
});


router.get('/distance/lines/:id', (req,res) => {
    
})

export default router;
