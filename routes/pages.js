import { Router } from "express";
import {PageModel} from "../database.js";

const pageRouter = Router();

// get alle sider
pageRouter.get("/", async (req, res) => {
  const data = await PageModel.find({});
  res.json(data);
});

// get alle titler
pageRouter.get("/titles", async (req, res) => {
  console.log("getting titles");
  // const ressy = await PageModel.updateOne({pageTitle:"test"}, {$rename:{"pageTitle":"title"}})
  // console.log(ressy);
  const page = await PageModel.find({pageTitle: "test"})
  console.log("page found!",page);
  // await PageModel.collection.createIndex({title:String})
  // console.log("page model",PageModel);
  // await PageModel.updateOne({pageTitle: "test"}, { $rename: { 'pageTitle': 'test' } }, { multi: true }, function (err, blocks) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log("done!");
  // });
  // const response = (await PageModel.find({pageTitle: "test"}))
  // response.
  // console.log("all pages hopefully:", response);
  // response.forEach(async (doc) => {
  //   console.log("test log 1");
  //   doc.title = doc.pageTitle;
  //   console.log("test log 2");
  //   delete doc.pageTitle
  //   console.log("test log 3");
  //   console.log("DOC",doc);
  //   const response = await doc.save()
  //   console.log("response? ",response);
  // })
  // const response = await PageModel.find({pageTitle: {$exists: true}}, {$rename:{"pageTitle":"title"} }, {multi: true})
  // console.log("res",response);
  // console.log("matched count",response.matchedCount);
  // console.log("modified count",response.modifiedCount);
  // const data = await PageModel.find({}, 'title');
  res.json("tihi");
});

// get én side ud fra title
pageRouter.get("/:title", async (req, res) => {
     
  const title = req.params.title;

  try {
    const result = await PageModel.findOne({ title: title });

    if (!result) {
      return res.status(404).json({ message: `Data not found for title: ${title}` });
    }
    console.log("body:",result.pageBody);
    console.log("body length:",result.pageBody.length);
    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// pageRouter.patch("/:title", async (req, res) => {
pageRouter.patch("/", async (req, res) => {
  //   const title = req.params.title;
  // const title = req.params.title;
  const updateData = req.body;
  console.log(updateData);
  console.log("body length", updateData.pageBody.length);

  try {
    const updatedPage = await PageModel.findOneAndUpdate({ title: updateData.title }, {pageBody: updateData.pageBody, lastUpdated: new Date()}, { new: true });

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
    title: data.title,
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
