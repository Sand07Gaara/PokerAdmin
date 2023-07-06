import express from "express";
import { authorizeBearerToken } from "../../middlewares/auth";
import * as tournamentController from "../../controllers/tournament";

const router = express.Router();

router.post("/create", authorizeBearerToken, tournamentController.create);
router.put("/update", authorizeBearerToken, tournamentController.update);
router.delete("/:id", authorizeBearerToken, tournamentController.remove);
router.post("/getlist", authorizeBearerToken, tournamentController.getList);
router.post("/detail", authorizeBearerToken, tournamentController.detail);

module.exports = router;
