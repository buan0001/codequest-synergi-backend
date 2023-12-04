import mongoose from "mongoose";

// connect to mongoDB
// test
mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/codequest-synergi");
// mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/synergiTest");

const pageSchema = new mongoose.Schema({
  pageTitle: {type:String, required: true},
  createdAt: {type:Date, immutable:true, default: new Date()},
  lastUpdated: {type:Date, default: new Date()},
  pageBody: {type: String}
})

const publishedSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  release: { type: Date, required: true },
  releaseYear: { type: Number, required: true },
  publisher: { type: String, required: true },
  authors: {
    type: [
      {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
      }
    ],
    required: true
  },
  link: { type: String },
  pay: { type: Boolean, default: false },
  resume: { type: String }
});

const bookingSchema = new mongoose.Schema({
  appointmentStart: Date, //ISO STRING: YYYY-MM-DDTHH:mm:ss.sssZ. Example: new Date(2023-12-04-T10:30)
  // appointmentEnd ???
  contactInfo:{
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    email: String
  },
  appointmentInfo: String
})

const PageModel = mongoose.model("page", pageSchema);
const BookModel = mongoose.model("book", publishedSchema);
const ArticleModel = mongoose.model("article", publishedSchema);

export { PageModel, BookModel, ArticleModel };
