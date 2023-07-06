import express from "express";
import { authorizeBearerToken } from "../../middlewares/auth";
import * as handHistoryController from "../../controllers/hand_history";

const router = express.Router();

router.delete("/:id", authorizeBearerToken, handHistoryController.remove);
router.post("/getlist", authorizeBearerToken, handHistoryController.getList);
router.post("/detail", authorizeBearerToken, handHistoryController.detail);

module.exports = router;
