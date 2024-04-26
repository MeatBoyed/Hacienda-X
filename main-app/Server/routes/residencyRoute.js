import express from "express";
import { createUser } from "../controllers/userCntrl.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
} from "../controllers/resdCntrl.js";

const router = express.Router();

router.post("/create", createProperty);
router.get("/allresd", getAllProperties);
router.get("/:id", getPropertyById);
export { router as residencyRoute };
