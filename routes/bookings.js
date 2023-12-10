import { Router } from "express";
import { OneDayBookingModel } from "../database.js";

const bookingRouter = Router();

// get alle bookings
bookingRouter.get("/", async (req, res) => {
  const data = await OneDayBookingModel.find({});
  res.json(data);
});

// get alle bookinger med samme telefonnummer
bookingRouter.get("/:phoneNumber", async (req, res) => {
  console.log("getting bookings with phoneNumber:", req.params.phoneNumber);
  const phoneNumber = req.params.phoneNumber;
  console.log("type of phoneNumber", typeof phoneNumber);

  try {
    const result = await OneDayBookingModel.find({ "contactInfo.phoneNumber": phoneNumber });
    console.log("result", result);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: `Data not found for phoneNumber: ${phoneNumber}` });
    }

    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// const existingBooking = await OneDayBookingModel.findOne({ "appointmentInfo.date": data.date });

bookingRouter.post("/", async (req, res) => {
  const data = req.body;

  try {
    // Extract only the date part (YYYY-MM-DD) from the ISO date string
    const isoDate = new Date(data.date);
    const dateOnly = new Date(isoDate.toISOString().split("T")[0]);

    // Calculate the start and end of the day for the provided date
    const startOfDay = new Date(dateOnly.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(dateOnly.setUTCHours(23, 59, 59, 999));

    // Check if a booking exists for the date (ignoring the time)
    const existingBooking = await OneDayBookingModel.findOne({
      "appointmentInfo.date": {
        $gte: startOfDay, // $gte operator (greater than or equal)
        $lte: endOfDay, // $lte operator (less than or equal)
      },
    });

    if (existingBooking) {
      console.error("Date already exists in the database");
      return res.status(400).json({ message: "Date already exists in the database" });
    } else if (!existingBooking) {
      const newBooking = new OneDayBookingModel({
        contactInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
        },
        appointmentInfo: {
          service: data.service,
          date: data.date,
          message: data.message,
        },
      });

      const savedBooking = await newBooking.save();
      // Handle saved booking
      res.status(201).json(savedBooking);
    }
  } catch (error) {
    // Log the full error stack trace for debugging purposes
    console.error("Error:", error.stack);
    res.status(500).json({ message: "Server Error" });
  }
});


bookingRouter.delete("/:bookingId", async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const deleteBooking = await OneDayBookingModel.findOneAndDelete({ _id: bookingId });

    if (!bookingId) {
      return res.status(404).json({ message: "Document not found - and not Deleted" });
    }
    res.json(deleteBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
