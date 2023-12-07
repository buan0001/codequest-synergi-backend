import { Router } from "express";
import { BookingModel } from "../database.js";

const bookingRouter = Router();

// get alle bookings
bookingRouter.get("/", async (req, res) => {
  const data = await BookingModel.find({});
  res.json(data);
});

// get en booking
bookingRouter.get("/:phoneNumber", async (req, res) => {
  console.log("getting ONE booking med phoneNumber:", req.params.phoneNumber);
  const phoneNumber = req.params.phoneNumber;
  console.log("type of phoneNumber", typeof phoneNumber);

  try {
    const result = await BookingModel.findOne({ "contactInfo.phoneNumber": phoneNumber });
    console.log("result", result);

    if (!result) {
      return res.status(404).json({ message: `Data not found for phoneNumber: ${phoneNumber}` });
    }

    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

bookingRouter.post("/", async (req, res) => {
  const data = req.body;

  try {
    const newBooking = new BookingModel({
      contactInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email
      },
      appointmentInfo: {
        service: data.chooseService,
        firstDay: data.firstDay,
        lastDay: data.lastDay,
        message: data.message
      }
    });

    // console.log(newArticle);

    const savedBooking = await newBooking.save();

    if (!savedBooking) {
      return res.status(404).json({ message: "something went wrong - booking not saved" });
    }

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // articleRouter.patch("/:articleTitle", async (req, res) => {
// articleRouter.patch("/", async (req, res) => {
//   // const articleTitle = req.params.articleTitle;
//   const updateData = req.body;
//   console.log("patching article with this body:", updateData);

//   try {
//     const updatedArticle = await ArticleModel.findOneAndUpdate({ title: updateData.title }, updateData.resume, { new: true });

//     if (!updatedArticle) {
//       return res.status(404).json({ message: "Document not found - and not Updated" });
//     }
//     res.json(updatedArticle);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// articleRouter.delete("/:articleTitle", async (req, res) => {
//   const articleTitle = req.params.articleTitle;

//   try {
//     const deleteArticle = await ArticleModel.findOneAndDelete({ title: articleTitle });

//     if (!articleTitle) {
//       return res.status(404).json({ message: "Document not found - and not Deleted" });
//     }
//     res.json(deleteArticle);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default bookingRouter;
