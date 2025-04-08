import { Router } from 'express';

const router = Router();

router.post('/signup', (req, res) => {
  res.send('Hello World from User!');
});

router.post('/login', (req,res) => {
    
})
export default router;
