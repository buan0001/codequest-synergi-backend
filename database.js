import mongoose from "mongoose";

// connect to mongoDB
// test
mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/codequest-synergi");
// mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/synergiTest");

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, immutable: true, default: new Date() },
  lastUpdated: { type: Date, default: new Date() },
  body: { type: String },
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
        lastName: { type: String, required: true },
      },
    ],
    required: true,
  },
  link: { type: String },
  pay: { type: Boolean, default: false },
  resume: { type: String },
});

// const bookingSchema = new mongoose.Schema({
//   contactInfo: {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     phoneNumber: { type: Number, required: true },
//     email: { type: String, required: true },
//   },
//   appointmentInfo: {
//     service: { type: String, required: true },
//     firstDay: { type: String, required: true },
//     lastDay: { type: String, required: true },
//     message: { type: String },
//   },
// });

const oneDayBookingSchema = new mongoose.Schema({
  contactInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
  },
  appointmentInfo: {
    service: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
    message: { type: String },
  },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: {type: String},
  body: String,
  resume: String,
  commentsAllowed: { type: Boolean, required: true },
  createdAt: { type: Date, default: new Date() },
  lastUpdated: { type: Date, default: new Date() },
  comments: [{type: mongoose.Types.ObjectId, ref: 'CommentModel'}] , // reference to the specific comment
});

const commentSchema = new mongoose.Schema({
  body: String,
  userID: mongoose.Types.ObjectId,
  postID: {type: mongoose.Types.ObjectId, index: true},
});

const userSchema = new mongoose.Schema({
  userName: String,
});

const BlogModel = mongoose.model("blog", blogSchema);
const CommentModel = mongoose.model("comment", commentSchema);
const UserModel = mongoose.model("user", userSchema);

const PageModel = mongoose.model("page", pageSchema);
const BookModel = mongoose.model("book", publishedSchema);
const ArticleModel = mongoose.model("article", publishedSchema);
// const BookingModel = mongoose.model("booking", bookingSchema);
const OneDayBookingModel = mongoose.model("booking", oneDayBookingSchema);

export { PageModel, BookModel, ArticleModel, OneDayBookingModel, BlogModel, CommentModel, UserModel };
