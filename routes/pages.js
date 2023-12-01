import { Router } from "express";
import {PageModel} from "../database.js";

const pageRouter = Router();

// get alle sider
pageRouter.get("/", async (req, res) => {
  const data = await PageModel.find({});
  res.json(data);
});

// get én side ud fra pageTitle
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

// pageRouter.patch("/:pageTitle", async (req, res) => {
pageRouter.patch("/", async (req, res) => {
  //   const pageTitle = req.params.pageTitle;
  // const pageTitle = req.params.pageTitle;
  const updateData = req.body;
  console.log(updateData);

  try {
    const updatedPage = await PageModel.findOneAndUpdate({ pageTitle: updateData.pageTitle }, updateData.pageBody, { new: true });

    if (!updatedPage) {
      return res.status(404).json({ message: "Document not found - and not Updated" });
    }
    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// KUN TIL TEST!!!
pageRouter.post("/", async (req, res) => {
  // console.log("POSTING NEW PAGE");
  console.log("BODY", req.body);
  const data = req.body;
  const newPage = new PageModel({
    pageTitle: data.pageTitle,
    pageBody: data.pageBody,
  });
  try {
    // console.log("NEW PAGE", newPage);
    newPage.save().then(savedPage => {
      console.log("page saved", savedPage);
      res.json(savedPage);
    });
  } catch (error) {
    res.json(error);
  }
});

export default pageRouter;
