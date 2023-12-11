import { Router } from "express";
import { CommentModel } from "../database.js";

const commentRouter = Router();

// get alle posts
commentRouter.get("/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
  const data = await BlogModel.find({ postID: blogId });
  console.log("getting all comments from post with id:", blogId);
  res.json(data);
});

// get én post
commentRouter.get("/:blogId", async (req, res) => {
  console.log("getting blogpost with id:", req.params.blogId);
  const ID = req.params.blogId;

  try {
    const result = await BlogModel.findOne({ _id: ID }).populate("CommentModel").exec();
    console.log("result", result);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: `Data not found for id: ${ID}` });
    }

    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// post én blog post
commentRouter.post("/", async (req, res) => {
  const data = req.body;
  console.log("creating post with this payload:", data);
  console.log(Object.entries);

  try {
    const response = await new BlogModel(data).save();
    console.log("response", response);
    res.status(201).json(response);
  } catch (error) {
    // Log the full error stack trace for debugging purposes
    console.error("Error:", error.stack);
    res.status(500).json({ message: "Server Error" });
  }
});

commentRouter.delete("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const deleteBooking = await BlogModel.findOneAndDelete({ _id: blogId });

    if (!bookingId) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default commentRouter;
