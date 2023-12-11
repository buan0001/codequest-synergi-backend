import { Router } from "express";
import { CommentModel } from "../database.js";

const commentRouter = Router();

// get alle kommentarer tilhørende ét opslag
commentRouter.get("/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
  const data = await CommentModel.find({ postID: blogId });
  console.log("getting all comments from post with id:", blogId);
  res.json(data);
});


// post én blog post
commentRouter.post("/", async (req, res) => {
  const data = req.body;
  console.log("creating comment with this body:", data);

  try {
    const response = await new CommentModel(data).save();
    console.log("response", response);
    res.status(201).json(response);
  } catch (error) {
    // Log the full error stack trace for debugging purposes
    console.error("Error:", error.stack);
    res.status(500).json({ message: "Server Error" });
  }
});

commentRouter.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const deleteBooking = await CommentModel.findOneAndDelete({ _id: commentId });

    if (!bookingId) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default commentRouter;
