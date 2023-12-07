import mongoose from "mongoose";

// connect to mongoDB
// test
mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/codequest-synergi");
// mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/synergiTest");

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, immutable: true, default: new Date() },
  lastUpdated: { type: Date, default: new Date() },
  body: { type: String }
});

const publishedSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  // release: { type: Date, required: true },
  releaseYear: { type: Number, required: true },
  publisher: { type: String, required: true },
  authors: {
    type: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
      }
    ],
    required: true
  },
  link: { type: String },
  pay: { type: Boolean, default: false },
  resume: { type: String }
});

const bookingSchema = new mongoose.Schema({
  contactInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true }
  },
  appointmentInfo: {
    service: { type: String, required: true },
    firstDay: { type: String, required: true },
    lastDay: { type: String, required: true },
    message: { type: String }
  }
});

const PageModel = mongoose.model("page", pageSchema);
const BookModel = mongoose.model("book", publishedSchema);
const ArticleModel = mongoose.model("article", publishedSchema);
const BookingModel = mongoose.model("booking", bookingSchema);

export { PageModel, BookModel, ArticleModel, BookingModel };
