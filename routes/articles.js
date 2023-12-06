import { Router } from "express";
import { ArticleModel } from "../database.js";

const articleRouter = Router();

// get alle artikler
articleRouter.get("/", async (req, res) => {
  console.log("getting articles");
  const data = await ArticleModel.find({});
  res.json(data);
});

// get en artikel
articleRouter.get("/:articleTitle", async (req, res) => {
  console.log("getting ONE article with title:",req.params.articleTitle);
  const articleTitle = req.params.articleTitle;
  console.log("type of title",typeof articleTitle);

  try {
    const result = await ArticleModel.findOne({ title: articleTitle });
    console.log("result",result);
    if (!result) {
      return res.status(404).json({ message: `Data not found for Articletitle: ${articleTitle}` });
    }

    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

articleRouter.post("/", async (req, res) => {
  console.log("posting article");
  const data = req.body;

  try {
    const newArticle = new ArticleModel({
      title: data.title,
      releaseYear: data.releaseYear,
      publisher:data.publisher,
      authors: data.authors.map(obj => {return {firstName: obj.firstName, lastName: obj.lastName}}),
      link: data.link,
      pay: data.isPay,
      resume: data.resume
    });

    console.log("article to make",newArticle);

    const savedArticle = await newArticle.save();
    console.log("saved article?",savedArticle);

    if (!savedArticle) {
      return res.status(404).json({ message: "something went wrong - article not saved" });
    }

    res.status(201).json(savedArticle);
  } catch (error) {
    console.log("ERROR?!",error);
    res.status(500).json({ message: error.message });
  }
});

// articleRouter.patch("/:articleTitle", async (req, res) => {
articleRouter.patch("/", async (req, res) => {
  // const articleTitle = req.params.articleTitle;
  const updateData = req.body;
  console.log("patching article with this body:", updateData);

  try {
    const updatedArticle = await ArticleModel.findOneAndUpdate({ title: updateData.title }, updateData.resume, { new: true });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Document not found - and not Updated" });
    }
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

articleRouter.delete("/:articleTitle", async (req, res) => {
  const articleTitle = req.params.articleTitle;

  try {
    const deleteArticle = await ArticleModel.findOneAndDelete({ title: articleTitle });

    if (!articleTitle) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default articleRouter;
