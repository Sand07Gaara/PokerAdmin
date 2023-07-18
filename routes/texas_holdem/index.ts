import express from "express";
import { authorizeBearerToken } from "../../middlewares/auth";
import * as texas_holdemController from "../../controllers/texas_holdem";

const router = express.Router();

router.post("/create", authorizeBearerToken, texas_holdemController.create);
router.put("/update", authorizeBearerToken, texas_holdemController.update);
router.delete("/:id", authorizeBearerToken, texas_holdemController.remove);
router.post("/getlist", authorizeBearerToken, texas_holdemController.getList);
router.post("/detail", authorizeBearerToken, texas_holdemController.detail);

module.exports = router;
