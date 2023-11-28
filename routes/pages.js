import { Router } from "express";
import PageModel from "../database.js";

const pageRouter = Router();

pageRouter.get("/", async (req, res) => {
  const test = await PageModel.find({});
  res.json(test);
});

