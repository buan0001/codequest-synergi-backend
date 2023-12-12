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
    // Finds all comments by a single user
    const result = await CommentModel.find({ userID: ID }, "-__v").populate({ path: "postID", select: "title image", model: BlogModel }).sort("postID");
    if (!result || result.length === 0) {
      return res.status(404).json({ message: `result not found for id: ${ID}` });
    }

    // Things that will be used during the forEach
    const final = [];
    let tempPost;
    function initPost(post, comment) {
      tempPost = { _id: post._id, image: post.image, title: post.title, comments: [{ body: comment.body, createdAt: comment.createdAt }] };
    }
    // We want to reverse the structure: If the user has made multiple comments on the same post, we only want to include the post once and have the comments as a nested array
    // On the first cycle a new post object is instantiated.
    // Afterwards, this post object's comment array is populated with information from any comment under the same post
    // Here it's important that the array is already sorted by posts, since we rely on there being no more comments related to the same post, once a comment with a different post id is reached
    // Once this happens the temporary object is pushed into the final array and a new temp post object is instantiated.
    result.forEach((comment) => {
      if (!tempPost) {
        initPost(comment.postID, comment);
      } else if (tempPost._id === comment.postID._id) {
        tempPost.comments.push({ body: comment.body, createdAt: comment.createdAt });
      } else {
        final.push(tempPost);
        initPost(comment.postID, comment);
      }
    });
    // Since the final temp object will never be pushed into the final array by a new comment, we'll just push it once the loop is finished
    if (tempPost) {
      final.push(tempPost);
    }

    // Hopefully this should transform the object structure from something like:
    // {body, createdAt, post:{title, image, _id}}
    // To something like:
    // {title, image, comments:[{body, createdAt}]}


    res.json(final);
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
