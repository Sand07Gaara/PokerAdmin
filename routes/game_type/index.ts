import express from "express";
import { authorizeBearerToken } from "../../middlewares/auth";
import * as gameController from "../../controllers/game_type";

const router = express.Router();

router.post("/create", authorizeBearerToken, gameController.create);
router.put("/update", authorizeBearerToken, gameController.update);
router.delete("/:id", authorizeBearerToken, gameController.remove);
router.get("/getlist", authorizeBearerToken, gameController.getList);
router.post("/detail", authorizeBearerToken, gameController.detail);

module.exports = router;
