import { Router } from "express";
import { ArticleModel } from "../database.js";

const articleRouter = Router();

// get alle artikler
articleRouter.get("/", async (req, res) => {
  const data = await ArticleModel.find({});
  res.json(data);
});

// get en artikel
articleRouter.get("/:articleTitle", async (req, res) => {
  const articleTitle = req.params.articleTitle;

  try {
    const result = await BookModel.findOne({ title: articleTitle });

    if (!result) {
      return res.status(404).json({ message: `Data not found for Articletitle: ${articleTitle}` });
    }

    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

articleRouter.post("/", async (req, res) => {
  const data = req.body;

  try {
    const newArticle = new ArticleModel({
      title: data.title,
      release: data.release,
      releaseYear: data.releaseYear,
      publisher: data.publisher,
      authors: data.authors,
      link: data.link,
      pay: data.pay,
      resume: data.resume
    });

    console.log(newArticle);

    const savedArticle = await newArticle.save();

    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default articleRouter;
