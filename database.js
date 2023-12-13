import mongoose from "mongoose";

mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/codequest-synergi").then(() =>console.log("Connected to mongoDB!")).catch((err) =>console.error("Error connecting to server",err))


const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, immutable: true, default: new Date() },
  lastUpdated: { type: Date, default: new Date() },
  body: { type: String },
});

const publishedSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
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
  createdAt: { type: Date, default: new Date(), immutable: true },
  lastUpdated: { type: Date, default: new Date() },
});

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: new Date(), immutable: true },
  admin: Boolean,
});


const commentSchema = new mongoose.Schema({
  body: String,
  createdAt: { type: Date, default: new Date(), immutable:true},
  userID: { type: mongoose.Types.ObjectId, ref: 'UserModel', index:true },
  postID: { type: mongoose.Types.ObjectId, ref: 'BlogModel', index: true },
});

console.log("registering all models");

const UserModel = mongoose.model("user", userSchema);
const CommentModel = mongoose.model("comment", commentSchema);
const BlogModel = mongoose.model("blog", blogSchema);
const PageModel = mongoose.model("page", pageSchema);
const BookModel = mongoose.model("book", publishedSchema);
const ArticleModel = mongoose.model("article", publishedSchema);
const OneDayBookingModel = mongoose.model("booking", oneDayBookingSchema);

console.log("all models registered");

export { PageModel, BookModel, ArticleModel, OneDayBookingModel, BlogModel,UserModel, CommentModel,  };
