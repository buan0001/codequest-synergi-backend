import { Router } from "express";
import { UserModel, CommentModel, BlogModel } from "../database.js";

const userRouter = Router();

// get alle users
userRouter.get("/", async (req, res) => {
  const data = await UserModel.find({});
  console.log("getting all users");
  res.json(data);
});

// get users alt efter admin status
userRouter.get("/:adminStatus", async (req, res) => {
  const adminBool = req.params.adminStatus;
  const data = await UserModel.find({ admin: adminBool });
  console.log("getting all users with adminbool:", adminBool);
  res.json(data);
});

// get all comments from one user, paginated
userRouter.get("/comments/:userId", async (req, res) => {
  const ID = req.params.userId;
  console.log("getting comments from user with id:", ID);

  try {
    console.log("before result");
    // const result = await CommentModel
    // const result = await CommentModel.find({ userID: ID }, "-__v -userID").populate('postID').exec();
    const result = await CommentModel.find({ userID: ID }, ('-__v')).populate({ path: "postID", select:"title image",  model: BlogModel });
    console.log("after result",result);


    if (!result || result.length === 0) {
      return res.status(404).json({ message: `result not found for id: ${ID}` });
    }

    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

userRouter.post("/", async (req, res) => {
  const data = req.body;
  console.log("creating user with this name:", data);

  try {
    const response = await new UserModel(data).save();
    console.log("response", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error:", error.stack);
    res.status(500).json({ message: "Server Error" });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const deleteUser = await UserModel.findOneAndDelete({ _id: userId });

    if (!userId) {
      return res.status(404).json({ message: "Document not found - and not deleted" });
    }
    res.json(deleteUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default userRouter;
