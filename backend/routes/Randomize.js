import express from 'express';
import { getRestaurant } from '../controllers/Randomize.js';

const router = express.Router();

// all routes in here are starting with /randomize
router.post('/', getRestaurant);

export default router;