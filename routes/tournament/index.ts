import express from 'express';
import { authorizeBearerToken } from '../../middlewares/auth';
import * as tournamentController from '../../controllers/tournament';

const router = express.Router();

router.post('/create', authorizeBearerToken, tournamentController.create);
router.put('/update', authorizeBearerToken, tournamentController.update);
router.delete('/:id', authorizeBearerToken, tournamentController.remove);
router.get('/getlist', authorizeBearerToken, tournamentController.getList);

module.exports = router;