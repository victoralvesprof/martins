import express from "express";
import QueueController from "../controllers/queueController.js";

const router = express.Router();

router
  .post("/sendLog", QueueController.reduzirEstoque)

export default router;