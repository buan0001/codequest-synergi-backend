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
articleRouter.get("/:articleId", async (req, res) => {
  const ID = req.params.articleId;
  console.log("getting ONE article with id:",ID);
  

  try {
    const result = await ArticleModel.findOne({ _id: ID });
    console.log("result",result);
    if (!result) {
      return res.status(404).json({ message: `Data not found for articleId: ${ID}` });
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
articleRouter.patch("/:articleId", async (req, res) => {
  // const articleTitle = req.params.articleTitle;
  const updateData = req.body;
  const ID = req.params.articleId;
  console.log("patching article with this body:", updateData);

  try {
    const updatedArticle = await ArticleModel.findOneAndUpdate({ _id: ID }, updateData, { returnOriginal: false });
    console.log("updated article:",updatedArticle);
    if (!updatedArticle) {
      return res.status(404).json({ message: "Document not found - and not Updated" });
    }
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

articleRouter.delete("/:articleId", async (req, res) => {
  const ID = req.params.articleId;
  console.log("deleting article with id",ID);

  try {
    const deleteArticle = await ArticleModel.findOneAndDelete({ _id: ID });

    if (!ID) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default articleRouter;
