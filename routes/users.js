import { Router } from "express";
import { UserModel } from "../database.js";

const userRouter = Router();

// get alle posts
userRouter.get("/", async (req, res) => {
  const data = await UserModel.find({ });
  console.log("getting all users:", data);
  res.json(data);
});

// get én post
userRouter.get("/:blogId", async (req, res) => {
  console.log("getting blogpost with id:", req.params.blogId);
  const ID = req.params.blogId;

  try {
    const result = await UserModel.findOne({ _id: ID }).populate("CommentModel").exec();
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
userRouter.post("/", async (req, res) => {
  const data = req.body;
  console.log("creating user with this name:", data);

  try {
    const response = await new UserModel(data).save();
    console.log("response", response);
    res.status(201).json(response);
  } catch (error) {
    // Log the full error stack trace for debugging purposes
    console.error("Error:", error.stack);
    res.status(500).json({ message: "Server Error" });
  }
});

userRouter.delete("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const deleteBooking = await UserModel.findOneAndDelete({ _id: blogId });

    if (!bookingId) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default userRouter;
