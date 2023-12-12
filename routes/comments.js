import { Router } from "express";
import { UserModel,CommentModel } from "../database.js";

const commentRouter = Router();

// get alle kommentarer tilhørende ét opslag
commentRouter.get("/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
  const data = await CommentModel.find({ postID: blogId }, ('-__v')).populate({path:'userID',select:'-__v', model: UserModel}).exec();
//   console.log("all comments from one blog",data);
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
    res.status(500).json({ message: "Server Error" });
  }
});

commentRouter.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  console.log("deleting comment");
  try {
    const deleteComment = await CommentModel.findOneAndDelete({ _id: commentId });

    if (!commentId) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default commentRouter;
