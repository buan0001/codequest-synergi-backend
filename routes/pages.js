
import { Router } from "express";
import { PageModel } from "../database.js";

const pageRouter = Router();

// get alle sider
pageRouter.get("/", async (req, res) => {
  const data = await PageModel.find({});
  res.json(data);
});


// get alle titler
pageRouter.get("/titles", async (req, res) =>{
  const data = await PageModel.find({}).select('title -_id')
  console.log("data",data);
  res.json(data)
})



// get én side ud fra title
pageRouter.get("/:title", async (req, res) => {
  const title = req.params.title;
  console.log("find this title:",title);

  try {
    const result = await PageModel.findOne({ title: title });

    if (!result) {
      return res.status(404).json({ message: `Data not found for title: ${title}` });
    }
    console.log("body:", result.body);
    console.log("body length:", result.body.length);
    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

pageRouter.patch("/", async (req, res) => {
  console.log("patching a page:",req.body);
  const updateData = req.body;

  try {
    const updatedPage = await PageModel.findOneAndUpdate(
      { title: updateData.title },
      { body: updateData.body, lastUpdated: new Date() },
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ message: "Document not found - and not Updated" });
    }
    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// KUN TIL DEV BRUG
pageRouter.post("/", async (req, res) => {
  // console.log("POSTING NEW PAGE");
  console.log("BODY", req.body);
  const data = req.body;
  const newPage = new PageModel({
    title: data.title,
    body: data.body,
  });
  try {
    newPage.save().then(savedPage => {
      console.log("page saved", savedPage);
      res.json(savedPage);
    });
  } catch (error) {
    res.json(error);
  }
});

export default pageRouter;



// route til at ændre skema, hvis det skulle blive nødvendigt

// pageRouter.get("/body", async (req, res) => {
//   console.log("getting titles");
//   const page = await PageModel.updateMany({}, {$rename:{body: "body"}});
//   console.log("success?",page);
//   res.json(page);
// });