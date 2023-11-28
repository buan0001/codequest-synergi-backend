import { Router } from "express";
import PageModel from "../database.js";

const pageRouter = Router();

pageRouter.get("/", async (req, res) => {
  const test = await PageModel.find({});
  res.json(test);
});

pageRouter.get("/:pageTitle", async (req, res) => {
  const pageTitle = req.params.pageTitle;

  try {
    const result = await PageModel.findOne({ pageTitle });

    if (!result) {
      return res.status(404).json({ message: `Data not found for pageTitle: ${pageTitle}` });
    }

    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default pageRouter;
