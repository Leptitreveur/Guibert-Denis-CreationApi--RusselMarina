import express from 'express';
import logout from '../services/logout.js';

const router = express.Router();

router.post('/', logout);

export default router;
