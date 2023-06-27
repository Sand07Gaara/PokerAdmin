import express from 'express';
import { authorizeBearerToken } from '../../middlewares/auth';
import { create } from '../../controllers/tournament/create'; 

const router = express.Router();

router.post('/create', authorizeBearerToken, create);

module.exports = router;