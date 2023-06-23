import express from 'express';
import { login } from '../../controllers/auth/login';
import { authorizeBearerToken } from '../../middlewares/auth';

const router = express.Router();

router.post('/login', login);

module.exports = router;