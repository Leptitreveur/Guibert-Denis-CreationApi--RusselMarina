import express from 'express';
import checkJWT from '../middlewares/private.js';

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get('/'); // route vers le tableau des reservation via un service

export default router;
