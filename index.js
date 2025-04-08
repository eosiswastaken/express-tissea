import express from 'express';
import statsRoutes from './routes/stats.js';
import categoriesRoutes from './routes/categories.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(express.json())
const port = 3000;

app.use('/api/stats',statsRoutes);
app.use('/api/categories',categoriesRoutes);
app.use('/api/users',userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
