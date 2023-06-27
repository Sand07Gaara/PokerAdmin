import express from 'express';
import { authorizeBearerToken } from '../../middlewares/auth';
import * as tournamentController from '../../controllers/tournament';

const router = express.Router();

router.post('/create', authorizeBearerToken, tournamentController.create);
router.post('/update', authorizeBearerToken, tournamentController.update);

module.exports = router;