import { Router } from "express";
import PageModel from "../database.js";

const pageRouter = Router();

// get alle sider
pageRouter.get("/", async (req, res) => {
  const test = await PageModel.find({});
  res.json(test);
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

pageRouter.patch("/update/:pageTitle", async (req, res) => {
  //   const pageTitle = req.params.pageTitle;
  const pageTitle = req.params.pageTitle;
  const updateData = req.body;
  console.log(updateData);

  try {
    const updatedPage = await PageModel.findOneAndUpdate({ pageTitle: pageTitle }, updateData, { new: true });

    if (!updatedPage) {
      return res.status(404).json({ message: "Document not found - and not Updated" });
    }
    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // GET request to fetch a specific pageBody's title
// pageRouter.get("/pageBodyTitle/:pageTitle", async (req, res) => {
//   const pageTitle = req.params.pageTitle;

//   try {
//     // Query the database to find the pageTitle and retrieve its pageBody's title
//     const page = await PageModel.findOne({ pageTitle });

//     if (!page) {
//       return res.status(404).json({ message: "Page not found" });
//     }

//     // Extract the title from the first pageBody element (assuming it's an array)
//     const pageBodyTitle = page.pageBody[0].title; // Adjust this according to your data structure

//     if (!pageTitle) {
//       return res.status(404).json({ message: "Page title not found" });
//     }

//     res.json({ pageBodyTitle });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// KUN TIL TEST!!!
// pageRouter.get("/post", async (req, res) => {
//   const newPage = new PageModel({
//     pageTitle: "En anden side igen",
//     pageBody: [{ title: "Hej titel", body: "Dette er en anden side", image: "lol", placement: 30 }]
//   });

//   newPage.save().then((savedPage) => {
//     console.log("page saved", savedPage);
//   });
// });

export default pageRouter;
