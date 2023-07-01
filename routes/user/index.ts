import express from 'express';
import { authorizeBearerToken } from '../../middlewares/auth';
import * as userController from '../../controllers/user';

const router = express.Router();

router.get('/getcounts', authorizeBearerToken, userController.getCounts);

module.exports = router;