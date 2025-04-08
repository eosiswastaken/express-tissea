import express from 'express';
import statsRoutes from './routes/stats.js';
import categoriesRoutes from './routes/categories.js';
import userRoutes from './routes/user.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env.TOKEN_SECRET)
const app = express();
app.use(express.json())
const port = 3000;

function generateAccessToken(hash) {
  return jwt.sign(hash, process.env.TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

app.get("/token",(req,res) => {
  const token = generateAccessToken("username")
  res.json({"token":token})
})

app.use('/api/stats',authenticateToken,statsRoutes);
app.use('/api/categories',authenticateToken,categoriesRoutes);
app.use('/api/users',authenticateToken,userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
