import express from 'express';
import { authorizeBearerToken } from '../../middlewares/auth';
import * as tournamentTypeController from '../../controllers/tournament_type';

const router = express.Router();

router.post('/create', authorizeBearerToken, tournamentTypeController.create);
router.post('/update', authorizeBearerToken, tournamentTypeController.update);
router.get('/getlist', authorizeBearerToken, tournamentTypeController.getList);
router.delete('/:id', authorizeBearerToken, tournamentTypeController.remove);
router.post('/detail', authorizeBearerToken, tournamentTypeController.detail);

module.exports = router;