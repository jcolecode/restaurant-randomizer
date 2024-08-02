import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import APIs
import randomizeRoutes from './routes/Randomize.js';

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(cors());
app.use(express.json());

app.use('/randomize', randomizeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});