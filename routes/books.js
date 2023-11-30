import { Router } from "express";
import { BookModel } from "../database.js";

const bookRouter = Router();

// get alle bøger
bookRouter.get("/", async (req, res) => {
  const data = await BookModel.find({});
  res.json(data);
});

// get en bog
bookRouter.get("/:bookTitle", async (req, res) => {
  const bookTitle = req.params.bookTitle;

  try {
    const result = await BookModel.findOne({ title: bookTitle });

    if (!result) {
      return res.status(404).json({ message: `Data not found for Booktitle: ${bookTitle}` });
    }

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
      pay: data.pay,
      resume: data.resume
    });

    console.log(newBook);

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default bookRouter;
