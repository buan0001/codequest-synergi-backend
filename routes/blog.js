import { Router } from "express";
import { BlogModel, CommentModel } from "../database.js";

const blogRouter = Router();

// get alle posts
blogRouter.get("/", async (req, res) => {
  const data = await BlogModel.find({});
  console.log("getting all blog posts:");
  res.json(data);
});

// get én post
blogRouter.get("/:blogId", async (req, res) => {
  console.log("getting blogpost with id:", req.params.blogId);
  const ID = req.params.blogId;

  try {
    const result = await BlogModel.findOne({ _id: ID }).populate('CommentModel').exec()
    // console.log("result", result);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: `Data not found for id: ${ID}` });
    }

    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// post én blog post
blogRouter.post("/", async (req, res) => {
  const data = req.body;
  console.log("creating post with this payload:", data);
  try {
    const response = await new BlogModel( data ).save();
    console.log("response", response);
    res.status(201).json(response);
  } catch (error) {
    // Log the full error stack trace for debugging purposes
    console.error("Error:", error.stack);
    res.status(500).json({ message: "Server Error" });
  }
});

blogRouter.delete("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const deleteBlogPost = await BlogModel.findOneAndDelete({ _id: blogId });
    const deleteRelatedComments = await CommentModel.deleteMany({postID: blogId})
    console.log("deleted comments?",deleteRelatedComments);

    if (!blogId) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json([deleteBlogPost, deleteRelatedComments]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default blogRouter;
