import { Router } from "express";
import { BookModel } from "../database.js";

const bookRouter = Router();

// get alle bøger
bookRouter.get("/", async (req, res) => {
  const data = await BookModel.find({});
  res.json(data);
});

// get en bog
bookRouter.get("/:bookId", async (req, res) => {
  const ID = req.params.bookId;
  console.log("ID from getting one book",ID);

  try {
    const result = await BookModel.findOne({ _id: ID });

    if (!result) {
      return res.status(404).json({ message: `Data not found for Booktitle: ${ID}` });
    }
    console.log("result from getting one book:",result);
    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

bookRouter.post("/", async (req, res) => {
  const data = req.body;

  try {
    const newBook = new BookModel({
      title: data.title,
      release: data.release,
      releaseYear: data.releaseYear,
      publisher: data.publisher,
      authors: data.authors,
      link: data.link,
      pay: data.isPay,
      resume: data.resume
    });

    // console.log(newBook);

    const savedBook = await newBook.save();

    if (!savedBook) {
      return res.status(404).json({ message: "something went wrong - book not saved" });
    }

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

bookRouter.patch("/", async (req, res) => {
  // const bookTitle = req.params.bookTitle;
  const updateData = req.body;

  try {
    const updatedBook = await BookModel.findOneAndUpdate({ title: updateData.pageTitle }, updateData.resume, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Document not found - and not Updated" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

bookRouter.delete("/:bookId", async (req, res) => {
  const bookTitle = req.params.bookTitle;

  try {
    const deleteBook = await BookModel.findOneAndDelete({ title: bookTitle });

    if (!deleteBook) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default bookRouter;
